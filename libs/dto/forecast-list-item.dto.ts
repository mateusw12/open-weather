import type { WeatherConditionDto } from "@/libs/dto/weather-condition.dto";

export interface ForecastListItemDto {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: WeatherConditionDto[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}
