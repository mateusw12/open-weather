import { CurrentWeatherDto, ForecastDto } from "@/libs/dto";

export type WeatherShellProps = {
  initialCity: string;
  initialCurrent: CurrentWeatherDto;
  initialForecast: ForecastDto;
};

export type WeatherPayload = {
  city: string;
  current: CurrentWeatherDto;
  forecast: ForecastDto;
};
