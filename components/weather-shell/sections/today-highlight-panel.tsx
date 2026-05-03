import { WiDaySunny, WiSunrise, WiSunset } from "react-icons/wi";
import type { ForecastListItemDto } from "@/libs/dto";
import {
  SunCycleCard,
  SunCycleHeader,
  SunCycleProgress,
  SunCycleTrack,
  SunMarker,
  SunTimes,
  TempColumnChart,
  TempColumnFill,
  TempColumnItem,
  TempColumnTrack,
  TodayHighlight,
  TodayHighlightItem,
} from "@/components/weather-shell/styled";

type TodayHighlightPanelProps = {
  todayBlocks: ForecastListItemDto[];
  minTemp: number;
  maxTemp: number;
  tempRange: number;
  sunrise: string;
  sunset: string;
  daylightProgress: number;
  formatHour: (dtTxt: string) => string;
  getTempBarTone: (temp: number) => string;
};

export function TodayHighlightPanel({
  todayBlocks,
  minTemp,
  maxTemp,
  tempRange,
  sunrise,
  sunset,
  daylightProgress,
  formatHour,
  getTempBarTone,
}: TodayHighlightPanelProps) {
  return (
    <TodayHighlight>
      <h2>Resumo de hoje</h2>
      <p data-sub>Ritmo do dia com ciclo solar e temperatura por faixa horaria.</p>
      <SunCycleCard>
        <SunCycleHeader>
          <span>
            <WiSunrise size={22} /> Nascer {sunrise}
          </span>
          <span>
            <WiSunset size={22} /> Por {sunset}
          </span>
        </SunCycleHeader>

        <SunCycleTrack>
          <SunCycleProgress style={{ width: `${(daylightProgress * 100).toFixed(1)}%` }} />
          <SunMarker style={{ left: `${(daylightProgress * 100).toFixed(1)}%` }}>
            <WiDaySunny size={20} />
          </SunMarker>
        </SunCycleTrack>

        <SunTimes>
          <small>Min {minTemp}°</small>
          <small>Max {maxTemp}°</small>
        </SunTimes>
      </SunCycleCard>

      <TempColumnChart>
        {todayBlocks.map((item) => {
          const temp = Math.round(item.main.temp);
          const barHeight = 18 + ((temp - minTemp) / tempRange) * 82;
          const tone = getTempBarTone(temp);

          return (
            <TempColumnItem key={`temp-${item.dt}`}>
              <small>{formatHour(item.dt_txt)}</small>
              <TempColumnTrack>
                <TempColumnFill $height={barHeight} $tone={tone} />
              </TempColumnTrack>
              <strong>{temp}°</strong>
            </TempColumnItem>
          );
        })}
      </TempColumnChart>

      <TodayHighlightItem>
        <span>Media do periodo</span>
        <strong>
          {Math.round(todayBlocks.reduce((sum, item) => sum + item.main.temp, 0) / todayBlocks.length)}°
        </strong>
      </TodayHighlightItem>
    </TodayHighlight>
  );
}
