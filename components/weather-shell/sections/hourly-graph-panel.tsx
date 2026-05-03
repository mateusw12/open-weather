import type { ForecastListItemDto } from "@/libs/dto";
import {
  Hourly,
  HourlyBarFill,
  HourlyBarTrack,
  HourlyGraph,
  HourlyGraphItem,
} from "@/components/weather-shell/styled";
import { renderWeatherIcon } from "@/components/weather-shell/sections/weather-icon";

type HourlyGraphPanelProps = {
  nextHours: ForecastListItemDto[];
  nextHoursMin: number;
  nextHoursRange: number;
  formatHour: (dtTxt: string) => string;
  getTempBarTone: (temp: number) => string;
};

export function HourlyGraphPanel({
  nextHours,
  nextHoursMin,
  nextHoursRange,
  formatHour,
  getTempBarTone,
}: HourlyGraphPanelProps) {
  return (
    <Hourly>
      <h2>Proximas horas</h2>
      <p data-sub>Evolucao horaria da temperatura para ajustar compromissos do dia.</p>
      <HourlyGraph>
        {nextHours.map((item, index) => (
          <HourlyGraphItem key={item.dt} style={{ ["--delay" as string]: `${index * 55}ms` }}>
            <div>{renderWeatherIcon(item.weather[0]?.main ?? "clear", 20)}</div>
            <p>{formatHour(item.dt_txt)}</p>
            <HourlyBarTrack>
              <HourlyBarFill
                $height={22 + ((item.main.temp - nextHoursMin) / nextHoursRange) * 78}
                $tone={getTempBarTone(Math.round(item.main.temp))}
              />
            </HourlyBarTrack>
            <strong>{Math.round(item.main.temp)}°</strong>
          </HourlyGraphItem>
        ))}
      </HourlyGraph>
    </Hourly>
  );
}
