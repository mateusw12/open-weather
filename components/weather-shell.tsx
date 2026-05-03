"use client";

import styled from "@emotion/styled";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import type {
  CurrentWeatherDto,
  ForecastDto,
  ForecastListItemDto,
  GeocodingCityDto,
} from "@/libs/dto/weather";

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

const Shell = styled.main<{ $atmosphere: string }>`
  position: relative;
  width: min(1180px, 100%);
  margin: 0 auto;
  min-height: calc(100dvh - 60px);
  padding: 1rem 1rem 2rem;
  display: grid;
  gap: 1rem;
  align-content: start;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 34px;
    background: ${({ $atmosphere }) => $atmosphere};
    transition: background 520ms ease-in-out;
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: 1.6rem;
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Hero = styled.section`
  grid-column: 1 / -1;
  border-radius: 30px;
  padding: 1.25rem;
  backdrop-filter: blur(18px);
  background: linear-gradient(135deg, rgba(38, 125, 170, 0.44), rgba(33, 69, 125, 0.38));
  border: 1px solid var(--ow-border);
  box-shadow: 0 12px 45px rgba(7, 20, 37, 0.35);
  animation: enter 420ms ease both;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  h1 {
    font-size: clamp(2.7rem, 7vw, 5.3rem);
    line-height: 0.9;
    letter-spacing: -0.045em;
    font-weight: 700;
  }

  p {
    margin-top: 0.5rem;
    color: rgba(238, 247, 255, 0.88);
  }

  @keyframes enter {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SearchRow = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.65rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr auto auto;
    align-items: center;
  }
`;

const SearchWrap = styled.form`
  position: relative;
`;

const SearchField = styled.input`
  width: 100%;
  border: 1px solid var(--ow-border);
  border-radius: 15px;
  background: rgba(33, 69, 125, 0.42);
  color: var(--ow-text);
  padding: 0.85rem 2.5rem 0.85rem 0.9rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 180ms ease-in-out;

  &:focus {
    border-color: rgba(242, 151, 76, 0.72);
  }

  &::placeholder {
    color: rgba(234, 244, 255, 0.6);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: rgba(110, 198, 189, 0.95);
  cursor: pointer;
`;

const ActionButton = styled.button`
  border: 1px solid var(--ow-border);
  background: rgba(33, 69, 125, 0.44);
  color: var(--ow-text);
  border-radius: 14px;
  padding: 0.8rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 180ms ease-in-out, background 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
    background: rgba(38, 125, 170, 0.58);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

const SuggestionList = styled.ul`
  margin-top: 0.45rem;
  display: grid;
  gap: 0.3rem;
`;

const SuggestionButton = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid var(--ow-border);
  border-radius: 12px;
  background: rgba(33, 69, 125, 0.36);
  color: var(--ow-text);
  padding: 0.6rem 0.75rem;
  cursor: pointer;

  &:hover {
    background: rgba(38, 125, 170, 0.52);
  }
`;

const Stats = styled.section`
  border-radius: 24px;
  padding: 1.2rem;
  backdrop-filter: blur(14px);
  background: rgba(33, 69, 125, 0.42);
  border: 1px solid var(--ow-border);
  display: grid;
  gap: 0.7rem;
  animation: enter 440ms ease both;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(110, 198, 189, 0.92);
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: rgba(238, 247, 255, 0.84);
  }

  strong {
    font-size: 1.08rem;
  }
`;

const Hourly = styled.section`
  grid-column: 1 / -1;
  border-radius: 24px;
  padding: 1rem;
  backdrop-filter: blur(14px);
  background: rgba(33, 69, 125, 0.38);
  border: 1px solid var(--ow-border);
  animation: enter 460ms ease both;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(110, 198, 189, 0.9);
    margin-bottom: 0.8rem;
  }
`;

const HourlyScroll = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(92px, 1fr);
  gap: 0.7rem;
  overflow-x: auto;
  padding-bottom: 0.3rem;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(110, 198, 189, 0.48);
    border-radius: 999px;
  }
`;

const HourlyItem = styled.article`
  padding: 0.85rem;
  border-radius: 16px;
  background: rgba(33, 69, 125, 0.34);
  border: 1px solid var(--ow-border);
  scroll-snap-align: start;
  transition: transform 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  p {
    font-size: 0.85rem;
    color: rgba(238, 247, 255, 0.76);
  }

  strong {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.05rem;
  }
`;

const Daily = styled.section`
  border-radius: 24px;
  padding: 1rem;
  backdrop-filter: blur(14px);
  background: rgba(33, 69, 125, 0.38);
  border: 1px solid var(--ow-border);
  display: grid;
  gap: 0.5rem;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(110, 198, 189, 0.9);
    margin-bottom: 0.2rem;
  }
`;

const DailyRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.8rem;
  align-items: center;
  border-radius: 12px;
  padding: 0.5rem 0.7rem;
  background: rgba(38, 125, 170, 0.46);
`;

const ErrorMessage = styled.p`
  margin-top: 0.7rem;
  color: #ffd4b3;
`;

const SkeletonCard = styled.div`
  border-radius: 24px;
  min-height: 130px;
  border: 1px solid var(--ow-border);
  background:
    linear-gradient(
      100deg,
      rgba(33, 69, 125, 0.42) 22%,
      rgba(71, 175, 197, 0.52) 42%,
      rgba(38, 125, 170, 0.36) 62%
    );
  background-size: 220% 100%;
  animation: shimmer 1.2s linear infinite;

  @keyframes shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: -100% 0;
    }
  }
`;

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
