"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import type {
  CurrentWeatherDto,
  ForecastDto,
  ForecastListItemDto,
  GeocodingCityDto,
} from "@/libs/dto";
import {
  RevealSection,
  Shell,
  SkeletonCard,
} from "@/components/weather-shell/styled";
import { HeroPanel } from "@/components/weather-shell/sections/hero-panel";
import { HourlyGraphPanel } from "@/components/weather-shell/sections/hourly-graph-panel";
import { QuickStatsPanel } from "@/components/weather-shell/sections/quick-stats-panel";
import { TodayHighlightPanel } from "@/components/weather-shell/sections/today-highlight-panel";
import { WeeklyRangePanel } from "@/components/weather-shell/sections/weekly-range-panel";

type WeatherShellProps = {
  initialCity: string;
  initialCurrent: CurrentWeatherDto;
  initialForecast: ForecastDto;
};

type WeatherPayload = {
  city: string;
  current: CurrentWeatherDto;
  forecast: ForecastDto;
};

function formatHour(dtTxt: string) {
  const [, hourMinute] = dtTxt.split(" ");
  return hourMinute?.slice(0, 5) ?? "--:--";
}

function formatDay(dtTxt: string) {
  const date = new Date(dtTxt.replace(" ", "T"));
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date);
}

function formatTime(unix: number, timezoneSeconds: number) {
  const date = new Date((unix + timezoneSeconds) * 1000);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function mapAtmosphere(main: string) {
  const key = main.toLowerCase();

  if (key.includes("rain") || key.includes("drizzle") || key.includes("thunderstorm")) {
    return "radial-gradient(circle at 18% 22%, rgba(38, 125, 170, 0.46), transparent 38%), radial-gradient(circle at 80% 16%, rgba(71, 175, 197, 0.34), transparent 48%), linear-gradient(165deg, rgba(22, 52, 96, 0.94), rgba(33, 69, 125, 0.9))";
  }

  if (key.includes("cloud")) {
    return "radial-gradient(circle at 16% 22%, rgba(71, 175, 197, 0.32), transparent 36%), radial-gradient(circle at 80% 12%, rgba(110, 198, 189, 0.28), transparent 44%), linear-gradient(160deg, rgba(25, 55, 102, 0.95), rgba(33, 69, 125, 0.9))";
  }

  return "radial-gradient(circle at 12% 20%, rgba(255, 215, 128, 0.55), transparent 34%), radial-gradient(circle at 82% 18%, rgba(131, 190, 255, 0.42), transparent 42%), linear-gradient(162deg, rgba(97, 146, 235, 0.9), rgba(93, 111, 226, 0.82))";
}

function getWeeklyRanges(list: ForecastListItemDto[]) {
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
    label: formatDay(`${day} 12:00:00`),
  }));
}

function cityLabel(city: GeocodingCityDto) {
  const parts = [city.name, city.state, city.country].filter(Boolean);
  return parts.join(", ");
}

function getTempBarTone(temp: number) {
  if (temp <= 10) {
    return "linear-gradient(90deg, #8fd6ff, #c9f0ff)";
  }

  if (temp >= 30) {
    return "linear-gradient(90deg, #ffb06c, #ff824d)";
  }

  return "linear-gradient(90deg, #9dd6ff, #ffd787)";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function WeatherShell({
  initialCity,
  initialCurrent,
  initialForecast,
}: WeatherShellProps) {
  const { city: storedCity, saveCity } = useWeatherStorage(initialCity);
  const [query, setQuery] = useState(storedCity);
  const [payload, setPayload] = useState<WeatherPayload>({
    city: initialCity,
    current: initialCurrent,
    forecast: initialForecast,
  });
  const [suggestions, setSuggestions] = useState<GeocodingCityDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const atmosphere = mapAtmosphere(payload.current.weather[0]?.main ?? "clear");
  const currentDescription = payload.current.weather[0]?.description ?? "Condicao indisponivel";

  const nextHours = payload.forecast.list.slice(0, 10);
  const todayBlocks = payload.forecast.list.slice(0, 8);
  const weeklyRanges = getWeeklyRanges(payload.forecast.list);
  const minTemp = Math.round(Math.min(...todayBlocks.map((item) => item.main.temp)));
  const maxTemp = Math.round(Math.max(...todayBlocks.map((item) => item.main.temp)));
  const sunrise = formatTime(payload.forecast.city.sunrise, payload.forecast.city.timezone);
  const sunset = formatTime(payload.forecast.city.sunset, payload.forecast.city.timezone);
  const sunriseUnix = payload.forecast.city.sunrise;
  const sunsetUnix = payload.forecast.city.sunset;
  const nowUnix = payload.current.dt;
  const daylightProgress = clamp((nowUnix - sunriseUnix) / (sunsetUnix - sunriseUnix), 0, 1);
  const tempRange = Math.max(1, maxTemp - minTemp);
  const nextHoursMin = Math.min(...nextHours.map((item) => item.main.temp));
  const nextHoursMax = Math.max(...nextHours.map((item) => item.main.temp));
  const nextHoursRange = Math.max(1, nextHoursMax - nextHoursMin);
  const weekMin = Math.min(...weeklyRanges.map((item) => item.min));
  const weekMax = Math.max(...weeklyRanges.map((item) => item.max));
  const weekRange = Math.max(1, weekMax - weekMin);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-shell-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, [isLoading, payload.city]);

  const fetchWeather = useCallback(
    async (url: string, persistCity = true) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(url, { cache: "no-store" });
        const data = (await response.json()) as
          | WeatherPayload
          | {
              message: string;
            };

        if (!response.ok) {
          throw new Error("message" in data ? data.message : "Falha ao consultar clima.");
        }

        if (requestId !== requestIdRef.current) {
          return;
        }

        const nextPayload = data as WeatherPayload;
        setPayload(nextPayload);
        setQuery(nextPayload.city);
        setSuggestions([]);

        if (persistCity) {
          saveCity(nextPayload.city);
        }
      } catch (error) {
        if (requestId === requestIdRef.current) {
          setErrorMessage(error instanceof Error ? error.message : "Erro inesperado.");
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [saveCity],
  );

  const searchByCity = useCallback(
    async (city: string) => {
      const trimmed = city.trim();
      if (!trimmed) {
        return;
      }

      await fetchWeather(`/api/weather/by-city?city=${encodeURIComponent(trimmed)}`);
    },
    [fetchWeather],
  );

  const searchByCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMessage("Seu navegador não suporta geolocalização.");
      return;
    }

    setIsLocating(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeather(`/api/weather/by-coords?lat=${latitude}&lon=${longitude}`);
        setIsLocating(false);
      },
      () => {
        setErrorMessage("Não foi possível obter sua localização.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, [fetchWeather]);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const trimmed = query.trim();

      if (trimmed.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`/api/weather/suggest?query=${encodeURIComponent(trimmed)}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          setSuggestions([]);
          return;
        }

        const data = (await response.json()) as { cities: GeocodingCityDto[] };
        setSuggestions(data.cities ?? []);
      } catch {
        setSuggestions([]);
      }
    }, 260);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <Shell $atmosphere={atmosphere}>
      <HeroPanel
        city={payload.city}
        temp={payload.current.main.temp}
        description={currentDescription}
        feelsLike={payload.current.main.feels_like}
        minTemp={minTemp}
        maxTemp={maxTemp}
        humidity={payload.current.main.humidity}
        windSpeed={payload.current.wind.speed}
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        isLoading={isLoading}
        isLocating={isLocating}
        errorMessage={errorMessage}
        onSubmitSearch={() => {
          void searchByCity(query);
        }}
        onUseCurrentLocation={searchByCurrentLocation}
        onPickSuggestion={(label) => {
          void searchByCity(label);
        }}
        cityLabel={cityLabel}
      />

      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          <RevealSection data-shell-reveal>
            <QuickStatsPanel
              feelsLike={payload.current.main.feels_like}
              humidity={payload.current.main.humidity}
              windSpeed={payload.current.wind.speed}
              pressure={payload.current.main.pressure}
            />
          </RevealSection>

          <RevealSection data-shell-reveal>
            <TodayHighlightPanel
              todayBlocks={todayBlocks}
              minTemp={minTemp}
              maxTemp={maxTemp}
              tempRange={tempRange}
              sunrise={sunrise}
              sunset={sunset}
              daylightProgress={daylightProgress}
              formatHour={formatHour}
              getTempBarTone={getTempBarTone}
            />
          </RevealSection>

          <RevealSection data-shell-reveal>
            <WeeklyRangePanel
              weeklyRanges={weeklyRanges}
              weekMin={weekMin}
              weekRange={weekRange}
              getTempBarTone={getTempBarTone}
            />
          </RevealSection>

          <RevealSection data-shell-reveal>
            <HourlyGraphPanel
              nextHours={nextHours}
              nextHoursMin={nextHoursMin}
              nextHoursRange={nextHoursRange}
              formatHour={formatHour}
              getTempBarTone={getTempBarTone}
            />
          </RevealSection>
        </>
      )}
    </Shell>
  );
}
