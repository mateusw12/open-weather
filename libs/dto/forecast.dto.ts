import type { ForecastListItemDto } from "@/libs/dto/forecast-list-item.dto";

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
