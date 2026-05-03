import type {
  CurrentWeatherDto,
  ForecastDto,
  GeocodingCityDto,
} from "@/libs/dto/weather";
import { WeatherFetcher } from "@/libs/api/weather-fetcher";

export class WeatherService {
  static getCurrentByCity(city: string) {
    return WeatherFetcher.get<CurrentWeatherDto>("weather", { q: city });
  }

  static getForecastByCity(city: string) {
    return WeatherFetcher.get<ForecastDto>("forecast", { q: city });
  }

  static getCurrentByCoordinates(lat: number, lon: number) {
    return WeatherFetcher.get<CurrentWeatherDto>("weather", {
      lat,
      lon,
    });
  }

  static getForecastByCoordinates(lat: number, lon: number) {
    return WeatherFetcher.get<ForecastDto>("forecast", {
      lat,
      lon,
    });
  }

  static suggestCities(query: string, limit = 6) {
    return WeatherFetcher.getGeo<GeocodingCityDto[]>("direct", {
      q: query,
      limit,
    });
  }
}
