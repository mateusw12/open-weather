import {
  WeeklySection,
  WeekRangeBar,
  WeekRangeFill,
  WeekRangeRow,
  WeekRangeTrack,
} from "@/components/weather-shell/styled";
import { renderWeatherIcon } from "@/components/weather-shell/sections/weather-icon";

type WeeklyRangeItem = {
  day: string;
  min: number;
  max: number;
  main: string;
  label: string;
};

type WeeklyRangePanelProps = {
  weeklyRanges: WeeklyRangeItem[];
  weekMin: number;
  weekRange: number;
  getTempBarTone: (temp: number) => string;
};

export function WeeklyRangePanel({
  weeklyRanges,
  weekMin,
  weekRange,
  getTempBarTone,
}: WeeklyRangePanelProps) {
  return (
    <WeeklySection>
      <h2>Durante a semana</h2>
      <p data-sub>Faixa de minima e maxima de cada dia para planejar melhor a semana.</p>
      {weeklyRanges.map((item, index) => {
        const offset = ((item.min - weekMin) / weekRange) * 100;
        const width = Math.max(8, ((item.max - item.min) / weekRange) * 100);

        return (
          <WeekRangeRow key={`${item.day}-${index}`} style={{ ["--delay" as string]: `${index * 70}ms` }}>
            <span>{item.label}</span>
            <small>{item.min}°</small>
            <WeekRangeTrack>
              <WeekRangeBar>
                <WeekRangeFill $offset={offset} $width={width} $tone={getTempBarTone(item.max)} />
              </WeekRangeBar>
            </WeekRangeTrack>
            <small>{item.max}°</small>
            <div>{renderWeatherIcon(item.main, 20)}</div>
          </WeekRangeRow>
        );
      })}
    </WeeklySection>
  );
}
