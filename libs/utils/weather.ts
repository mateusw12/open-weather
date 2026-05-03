import type { ForecastListItemDto, GeocodingCityDto } from "@/libs/dto";

export type WeeklyRangeItem = {
  day: string;
  min: number;
  max: number;
  main: string;
  label: string;
};

export function formatForecastHour(dtTxt: string) {
  const [, hourMinute] = dtTxt.split(" ");
  return hourMinute?.slice(0, 5) ?? "--:--";
}

export function formatWeekdayShort(dtTxt: string) {
  const date = new Date(dtTxt.replace(" ", "T"));
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date);
}

export function formatTimeFromUnix(unix: number, timezoneSeconds: number) {
  const date = new Date((unix + timezoneSeconds) * 1000);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function mapAtmosphere(main: string) {
  const key = main.toLowerCase();

  if (key.includes("rain") || key.includes("drizzle") || key.includes("thunderstorm")) {
    return "radial-gradient(circle at 18% 22%, rgba(38, 125, 170, 0.46), transparent 38%), radial-gradient(circle at 80% 16%, rgba(71, 175, 197, 0.34), transparent 48%), linear-gradient(165deg, rgba(22, 52, 96, 0.94), rgba(33, 69, 125, 0.9))";
  }

  if (key.includes("cloud")) {
    return "radial-gradient(circle at 16% 22%, rgba(71, 175, 197, 0.32), transparent 36%), radial-gradient(circle at 80% 12%, rgba(110, 198, 189, 0.28), transparent 44%), linear-gradient(160deg, rgba(25, 55, 102, 0.95), rgba(33, 69, 125, 0.9))";
  }

  return "radial-gradient(circle at 12% 20%, rgba(255, 215, 128, 0.55), transparent 34%), radial-gradient(circle at 82% 18%, rgba(131, 190, 255, 0.42), transparent 42%), linear-gradient(162deg, rgba(97, 146, 235, 0.9), rgba(93, 111, 226, 0.82))";
}

export function getWeeklyRanges(list: ForecastListItemDto[]) {
  const byDay = new Map<
    string,
    { min: number; max: number; representativeMain: string; representativeDt: string }
  >();

  for (const item of list) {
    const day = item.dt_txt.slice(0, 10);
    const current = byDay.get(day);
    const temp = item.main.temp;
    const main = item.weather[0]?.main ?? "Clear";

    if (!current) {
      byDay.set(day, {
        min: temp,
        max: temp,
        representativeMain: main,
        representativeDt: item.dt_txt,
      });
      continue;
    }

    const preferredRepresentative = item.dt_txt.includes("12:00:00");
    byDay.set(day, {
      min: Math.min(current.min, temp),
      max: Math.max(current.max, temp),
      representativeMain: preferredRepresentative ? main : current.representativeMain,
      representativeDt: preferredRepresentative ? item.dt_txt : current.representativeDt,
    });

    if (byDay.size >= 6) {
      break;
    }
  }

  return Array.from(byDay.entries()).map(([day, value]) => ({
    day,
    min: Math.round(value.min),
    max: Math.round(value.max),
    main: value.representativeMain,
    label: formatWeekdayShort(`${day} 12:00:00`),
  })) satisfies WeeklyRangeItem[];
}

export function cityLabel(city: GeocodingCityDto) {
  const parts = [city.name, city.state, city.country].filter(Boolean);
  return parts.join(", ");
}

export function getTempBarTone(temp: number) {
  if (temp <= 10) {
    return "linear-gradient(90deg, #8fd6ff, #c9f0ff)";
  }

  if (temp >= 30) {
    return "linear-gradient(90deg, #ffb06c, #ff824d)";
  }

  return "linear-gradient(90deg, #9dd6ff, #ffd787)";
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function weatherEmoji(main: string) {
  const key = main.toLowerCase();

  if (key.includes("thunderstorm")) {
    return "⛈️";
  }

  if (key.includes("snow")) {
    return "❄️";
  }

  if (key.includes("rain") || key.includes("drizzle")) {
    return "🌧️";
  }

  if (key.includes("mist") || key.includes("haze") || key.includes("fog")) {
    return "🌫️";
  }

  if (key.includes("cloud")) {
    return "☁️";
  }

  return "☀️";
}
