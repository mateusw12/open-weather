export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherDto {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
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

export interface ForecastListItemDto {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}

export interface ForecastDto {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListItemDto[];
  city: {
    id: number;
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
