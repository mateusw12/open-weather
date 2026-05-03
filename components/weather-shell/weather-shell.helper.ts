import {
  getWeeklyRanges,
  formatTimeFromUnix,
  clamp,
} from "@/libs/utils/weather";
import { WeatherPayload } from "./weather-shell.interface";

export function isWeatherPayload(value: unknown): value is WeatherPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybePayload = value as Partial<WeatherPayload>;
  return Boolean(
    maybePayload.city && maybePayload.current && maybePayload.forecast,
  );
}

export function deriveWeatherMetrics(payload: WeatherPayload) {
  const list = payload.forecast.list ?? [];
  const currentTemp = Math.round(payload.current.main.temp);
  const nextHoursData = list.slice(0, 10);
  const todayBlocksData = list.slice(0, 8);
  const safeTodayBlocks =
    todayBlocksData.length > 0 ? todayBlocksData : nextHoursData;
  const todayTemps = safeTodayBlocks.map((item) => item.main.temp);

  const computedMinTemp = Math.round(
    todayTemps.length > 0 ? Math.min(...todayTemps) : currentTemp,
  );
  const computedMaxTemp = Math.round(
    todayTemps.length > 0 ? Math.max(...todayTemps) : currentTemp,
  );

  const weeklyRangesData = getWeeklyRanges(list);
  const weeklyMins = weeklyRangesData.map((item) => item.min);
  const weeklyMaxes = weeklyRangesData.map((item) => item.max);
  const computedWeekMin =
    weeklyMins.length > 0 ? Math.min(...weeklyMins) : computedMinTemp;
  const computedWeekMax =
    weeklyMaxes.length > 0 ? Math.max(...weeklyMaxes) : computedMaxTemp;

  const nextHourTemps = nextHoursData.map((item) => item.main.temp);
  const computedNextHoursMin =
    nextHourTemps.length > 0 ? Math.min(...nextHourTemps) : currentTemp;
  const computedNextHoursMax =
    nextHourTemps.length > 0 ? Math.max(...nextHourTemps) : currentTemp;

  const sunriseUnix = payload.forecast.city.sunrise;
  const sunsetUnix = payload.forecast.city.sunset;
  const nowUnix = payload.current.dt;
  const daylightDenominator = Math.max(1, sunsetUnix - sunriseUnix);

  return {
    nextHours: nextHoursData,
    todayBlocks: safeTodayBlocks,
    weeklyRanges: weeklyRangesData,
    minTemp: computedMinTemp,
    maxTemp: computedMaxTemp,
    sunrise: formatTimeFromUnix(
      payload.forecast.city.sunrise,
      payload.forecast.city.timezone,
    ),
    sunset: formatTimeFromUnix(
      payload.forecast.city.sunset,
      payload.forecast.city.timezone,
    ),
    daylightProgress: clamp(
      (nowUnix - sunriseUnix) / daylightDenominator,
      0,
      1,
    ),
    tempRange: Math.max(1, computedMaxTemp - computedMinTemp),
    nextHoursMin: computedNextHoursMin,
    nextHoursRange: Math.max(1, computedNextHoursMax - computedNextHoursMin),
    weekMin: computedWeekMin,
    weekRange: Math.max(1, computedWeekMax - computedWeekMin),
  };
}
