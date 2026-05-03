const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export class WeatherFetcher {
  static async get<T>(path: string, query: Record<string, string | number>) {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_WEATHER_API_KEY environment variable.");
    }

    const params = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(query).map(([key, value]) => [key, String(value)]),
      ),
      appid: apiKey,
      units: "metric",
      lang: "pt_br",
    });

    const response = await fetch(`${WEATHER_API_BASE_URL}/${path}?${params.toString()}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`OpenWeather request failed (${response.status}): ${details}`);
    }

    return (await response.json()) as T;
  }
}
