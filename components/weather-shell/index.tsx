"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import type {
  CurrentWeatherDto,
  ForecastDto,
  GeocodingCityDto,
} from "@/libs/dto";
import {
  cityLabel,
  clamp,
  formatForecastHour,
  formatTimeFromUnix,
  getTempBarTone,
  getWeeklyRanges,
  mapAtmosphere,
} from "@/libs/utils/weather";
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

function isWeatherPayload(value: unknown): value is WeatherPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybePayload = value as Partial<WeatherPayload>;
  return Boolean(maybePayload.city && maybePayload.current && maybePayload.forecast);
}

export function WeatherShell({
  initialCity,
  initialCurrent,
  initialForecast,
}: WeatherShellProps) {
  const fallbackPayload: WeatherPayload = {
    city: initialCity,
    current: initialCurrent,
    forecast: initialForecast,
  };
  const { city: storedCity, saveCity } = useWeatherStorage(initialCity);
  const [query, setQuery] = useState(storedCity);
  const [payload, setPayload] = useState<WeatherPayload | null>(fallbackPayload);
  const [suggestions, setSuggestions] = useState<GeocodingCityDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const activePayload = payload ?? fallbackPayload;

  const atmosphere = mapAtmosphere(activePayload.current.weather[0]?.main ?? "clear");
  const currentDescription = activePayload.current.weather[0]?.description ?? "Condicao indisponivel";

  const nextHours = activePayload.forecast.list.slice(0, 10);
  const todayBlocks = activePayload.forecast.list.slice(0, 8);
  const weeklyRanges = getWeeklyRanges(activePayload.forecast.list);
  const minTemp = Math.round(Math.min(...todayBlocks.map((item) => item.main.temp)));
  const maxTemp = Math.round(Math.max(...todayBlocks.map((item) => item.main.temp)));
  const sunrise = formatTimeFromUnix(activePayload.forecast.city.sunrise, activePayload.forecast.city.timezone);
  const sunset = formatTimeFromUnix(activePayload.forecast.city.sunset, activePayload.forecast.city.timezone);
  const sunriseUnix = activePayload.forecast.city.sunrise;
  const sunsetUnix = activePayload.forecast.city.sunset;
  const nowUnix = activePayload.current.dt;
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
  }, [isLoading, activePayload.city]);

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
            }
          | null;

        if (!response.ok && data) {
          throw new Error("message" in data ? data.message : "Falha ao consultar clima.");
        }

        if (requestId !== requestIdRef.current) {
          return;
        }

        if (!isWeatherPayload(data)) {
          throw new Error("Resposta de clima invalida.");
        }

        const nextPayload = data;
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
        city={activePayload.city}
        temp={activePayload.current.main.temp}
        description={currentDescription}
        feelsLike={activePayload.current.main.feels_like}
        minTemp={minTemp}
        maxTemp={maxTemp}
        humidity={activePayload.current.main.humidity}
        windSpeed={activePayload.current.wind.speed}
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
              feelsLike={activePayload.current.main.feels_like}
              humidity={activePayload.current.main.humidity}
              windSpeed={activePayload.current.wind.speed}
              pressure={activePayload.current.main.pressure}
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
              formatHour={formatForecastHour}
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
              formatHour={formatForecastHour}
              getTempBarTone={getTempBarTone}
            />
          </RevealSection>
        </>
      )}
    </Shell>
  );
}
