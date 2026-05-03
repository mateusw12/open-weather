import type { WeatherConditionDto } from "@/libs/dto/weather-condition.dto";

export interface CurrentWeatherDto {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherConditionDto[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  timezone: number;
  id: number;
  name: string;
}
