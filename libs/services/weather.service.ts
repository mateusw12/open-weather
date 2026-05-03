import type { CurrentWeatherDto, ForecastDto, GeocodingCityDto } from "@/libs/dto";
import { WeatherFetcherService } from "@/libs/api/weather-fetcher.service";
import { OpenWeatherEndpoint } from "@/libs/enums/open-weather.enum";

export class WeatherService {
  static getCurrentByCity(city: string) {
    return WeatherFetcherService.getWeather<CurrentWeatherDto>(OpenWeatherEndpoint.Current, {
      q: city,
    });
  }

  static getForecastByCity(city: string) {
    return WeatherFetcherService.getWeather<ForecastDto>(OpenWeatherEndpoint.Forecast, {
      q: city,
    });
  }

  static getCurrentByCoordinates(lat: number, lon: number) {
    return WeatherFetcherService.getWeather<CurrentWeatherDto>(OpenWeatherEndpoint.Current, {
      lat,
      lon,
    });
  }

  static getForecastByCoordinates(lat: number, lon: number) {
    return WeatherFetcherService.getWeather<ForecastDto>(OpenWeatherEndpoint.Forecast, {
      lat,
      lon,
    });
  }

  static suggestCities(query: string, limit = 6) {
    return WeatherFetcherService.getGeo<GeocodingCityDto[]>(OpenWeatherEndpoint.DirectGeo, {
      q: query,
      limit,
    });
  }
}
