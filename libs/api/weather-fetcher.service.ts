import {
  OpenWeatherBaseUrl,
  OpenWeatherDefaults,
  OpenWeatherEndpoint,
} from "@/libs/enums/open-weather.enum";

type QueryValue = string | number;

export class WeatherFetcherService {
  private static get apiKey() {
    const value = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    if (!value) {
      throw new Error("Missing NEXT_PUBLIC_WEATHER_API_KEY environment variable.");
    }

    return value;
  }

  private static toSearchParams(
    query: Record<string, QueryValue>,
    includeDefaults: boolean,
  ) {
    const baseParams = Object.fromEntries(
      Object.entries(query).map(([key, value]) => [key, String(value)]),
    );

    return new URLSearchParams({
      ...baseParams,
      appid: this.apiKey,
      ...(includeDefaults
        ? {
            units: OpenWeatherDefaults.Units,
            lang: OpenWeatherDefaults.Language,
          }
        : {}),
    });
  }

  private static async request<T>(
    baseUrl: OpenWeatherBaseUrl,
    path: string,
    query: Record<string, QueryValue>,
    options: {
      revalidateSeconds: number;
      includeWeatherDefaults: boolean;
      errorPrefix: string;
    },
  ) {
    const params = this.toSearchParams(query, options.includeWeatherDefaults);
    const url = `${baseUrl}/${path}?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: options.revalidateSeconds },
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`${options.errorPrefix} (${response.status}): ${details}`);
    }

    return (await response.json()) as T;
  }

  static getWeather<T>(path: OpenWeatherEndpoint, query: Record<string, QueryValue>) {
    return this.request<T>(OpenWeatherBaseUrl.Weather, path, query, {
      revalidateSeconds: Number(OpenWeatherDefaults.WeatherRevalidateSeconds),
      includeWeatherDefaults: true,
      errorPrefix: "OpenWeather request failed",
    });
  }

  static getGeo<T>(path: OpenWeatherEndpoint, query: Record<string, QueryValue>) {
    return this.request<T>(OpenWeatherBaseUrl.Geo, path, query, {
      revalidateSeconds: Number(OpenWeatherDefaults.GeoRevalidateSeconds),
      includeWeatherDefaults: false,
      errorPrefix: "OpenWeather geo request failed",
    });
  }
}
