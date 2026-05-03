"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import type {
  CurrentWeatherDto,
  ForecastDto,
  ForecastListItemDto,
  GeocodingCityDto,
} from "@/libs/dto";
import {
  ActionButton,
  Daily,
  DailyRow,
  ErrorMessage,
  Hero,
  Hourly,
  HourlyItem,
  HourlyScroll,
  SearchButton,
  SearchField,
  SearchRow,
  SearchWrap,
  Shell,
  SkeletonCard,
  StatItem,
  Stats,
  SuggestionButton,
  SuggestionList,
} from "@/components/weather-shell/styled";

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

function mapAtmosphere(main: string) {
  const key = main.toLowerCase();

  if (key.includes("rain") || key.includes("drizzle") || key.includes("thunderstorm")) {
    return "radial-gradient(circle at 18% 22%, rgba(38, 125, 170, 0.46), transparent 38%), radial-gradient(circle at 80% 16%, rgba(71, 175, 197, 0.34), transparent 48%), linear-gradient(165deg, rgba(22, 52, 96, 0.94), rgba(33, 69, 125, 0.9))";
  }

  if (key.includes("cloud")) {
    return "radial-gradient(circle at 16% 22%, rgba(71, 175, 197, 0.32), transparent 36%), radial-gradient(circle at 80% 12%, rgba(110, 198, 189, 0.28), transparent 44%), linear-gradient(160deg, rgba(25, 55, 102, 0.95), rgba(33, 69, 125, 0.9))";
  }

  return "radial-gradient(circle at 12% 24%, rgba(71, 175, 197, 0.44), transparent 40%), radial-gradient(circle at 80% 14%, rgba(242, 151, 76, 0.24), transparent 46%), linear-gradient(165deg, rgba(33, 69, 125, 0.92), rgba(38, 125, 170, 0.88))";
}

function getDailyItems(list: ForecastListItemDto[]) {
  const byDay = new Map<string, ForecastListItemDto>();

  for (const item of list) {
    const day = item.dt_txt.slice(0, 10);
    const current = byDay.get(day);

    if (!current || item.dt_txt.includes("12:00:00")) {
      byDay.set(day, item);
    }

    if (byDay.size >= 5) {
      break;
    }
  }

  return Array.from(byDay.values());
}

function cityLabel(city: GeocodingCityDto) {
  const parts = [city.name, city.state, city.country].filter(Boolean);
  return parts.join(", ");
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

  const nextHours = payload.forecast.list.slice(0, 10);
  const dailyItems = getDailyItems(payload.forecast.list);

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
      <Hero>
        <h1>{Math.round(payload.current.main.temp)}°</h1>
        <p>{payload.city}</p>
        <p>{payload.current.weather[0]?.description ?? "Condição indisponível"}</p>

        <SearchRow>
          <SearchWrap
            onSubmit={(event) => {
              event.preventDefault();
              void searchByCity(query);
            }}
          >
            <SearchField
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque uma cidade"
              aria-label="Buscar cidade"
            />
            <SearchButton type="submit" aria-label="Pesquisar">
              <MagnifyingGlassIcon width={18} height={18} />
            </SearchButton>

            {suggestions.length > 0 && (
              <SuggestionList>
                {suggestions.map((item) => (
                  <li key={`${item.lat}-${item.lon}`}>
                    <SuggestionButton
                      type="button"
                      onClick={() => {
                        const label = cityLabel(item);
                        setQuery(label);
                        void searchByCity(label);
                      }}
                    >
                      {cityLabel(item)}
                    </SuggestionButton>
                  </li>
                ))}
              </SuggestionList>
            )}
          </SearchWrap>

          <ActionButton type="button" onClick={() => void searchByCity(query)} disabled={isLoading}>
            Pesquisar
          </ActionButton>

          <ActionButton type="button" onClick={searchByCurrentLocation} disabled={isLocating}>
            {isLocating ? "Buscando localização..." : "Usar minha localização"}
          </ActionButton>
        </SearchRow>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Hero>

      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          <Stats>
            <h2>Agora</h2>
            <StatItem>
              <span>Sensação</span>
              <strong>{Math.round(payload.current.main.feels_like)}°</strong>
            </StatItem>
            <StatItem>
              <span>Umidade</span>
              <strong>{payload.current.main.humidity}%</strong>
            </StatItem>
            <StatItem>
              <span>Vento</span>
              <strong>{payload.current.wind.speed.toFixed(1)} m/s</strong>
            </StatItem>
            <StatItem>
              <span>Pressão</span>
              <strong>{payload.current.main.pressure} hPa</strong>
            </StatItem>
          </Stats>

          <Daily>
            <h2>Próximos dias</h2>
            {dailyItems.map((item) => (
              <DailyRow key={item.dt}>
                <span>{formatDay(item.dt_txt)}</span>
                <span>{item.weather[0]?.main ?? "Sem dados"}</span>
                <strong>{Math.round(item.main.temp)}°</strong>
              </DailyRow>
            ))}
          </Daily>

          <Hourly>
            <h2>Próximas horas</h2>
            <HourlyScroll>
              {nextHours.map((item) => (
                <HourlyItem key={item.dt}>
                  <p>{formatHour(item.dt_txt)}</p>
                  <strong>{Math.round(item.main.temp)}°</strong>
                  <p>{item.weather[0]?.main ?? "Sem dados"}</p>
                </HourlyItem>
              ))}
            </HourlyScroll>
          </Hourly>
        </>
      )}
    </Shell>
  );
}
