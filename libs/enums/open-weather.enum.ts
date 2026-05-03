export enum OpenWeatherBaseUrl {
  Weather = "https://api.openweathermap.org/data/2.5",
  Geo = "https://api.openweathermap.org/geo/1.0",
}

export enum OpenWeatherEndpoint {
  Current = "weather",
  Forecast = "forecast",
  DirectGeo = "direct",
}

export enum OpenWeatherDefaults {
  Units = "metric",
  Language = "pt_br",
  WeatherRevalidateSeconds = "300",
  GeoRevalidateSeconds = "3600",
}
