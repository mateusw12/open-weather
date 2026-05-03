"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  WiCloud,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { FaMapMarkerAlt } from "react-icons/fa";
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
  DailyIcon,
  DailyRow,
  ErrorMessage,
  Hero,
  HeroChip,
  HeroChipGrid,
  Hourly,
  HourlyIcon,
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
  TodayHighlight,
  TempBarChart,
  TempBarFill,
  TempBarRow,
  TempBarTrack,
  TodayHighlightItem,
  SunCycleCard,
  SunCycleHeader,
  SunCycleProgress,
  SunCycleTrack,
  SunMarker,
  SunTimes,
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

function renderWeatherIcon(main: string, size = 24) {
  const key = main.toLowerCase();

  if (key.includes("thunderstorm")) {
    return <WiThunderstorm size={size} />;
  }

  if (key.includes("snow")) {
    return <WiSnow size={size} />;
  }

  if (key.includes("mist") || key.includes("haze") || key.includes("fog") || key.includes("smoke")) {
    return <WiFog size={size} />;
  }

  if (key.includes("rain")) {
    return <WiRain size={size} />;
  }

  if (key.includes("drizzle") || key.includes("shower")) {
    return <WiShowers size={size} />;
  }

  if (key.includes("cloud")) {
    return key.includes("few") ? <WiDayCloudy size={size} /> : <WiCloud size={size} />;
  }

  return <WiDaySunny size={size} />;
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
  const dailyItems = getDailyItems(payload.forecast.list);
  const todayBlocks = payload.forecast.list.slice(0, 8);
  const minTemp = Math.round(Math.min(...todayBlocks.map((item) => item.main.temp)));
  const maxTemp = Math.round(Math.max(...todayBlocks.map((item) => item.main.temp)));
  const sunrise = formatTime(payload.forecast.city.sunrise, payload.forecast.city.timezone);
  const sunset = formatTime(payload.forecast.city.sunset, payload.forecast.city.timezone);
  const sunriseUnix = payload.forecast.city.sunrise;
  const sunsetUnix = payload.forecast.city.sunset;
  const nowUnix = payload.current.dt;
  const daylightProgress = clamp((nowUnix - sunriseUnix) / (sunsetUnix - sunriseUnix), 0, 1);
  const tempRange = Math.max(1, maxTemp - minTemp);

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
        <p>
          <FaMapMarkerAlt size={13} /> Agora em {payload.city}
        </p>
        <h1>{Math.round(payload.current.main.temp)}°</h1>
        <p>{currentDescription}</p>
        <p>Sensacao termica de {Math.round(payload.current.main.feels_like)}°</p>

        <HeroChipGrid>
          <HeroChip>
            <span>Semana</span>
            <strong>
              {minTemp}° / {maxTemp}°
            </strong>
          </HeroChip>
          <HeroChip>
            <span>Umidade</span>
            <strong>{payload.current.main.humidity}%</strong>
          </HeroChip>
          <HeroChip>
            <span>Vento</span>
            <strong>{payload.current.wind.speed.toFixed(1)} m/s</strong>
          </HeroChip>
        </HeroChipGrid>

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
              placeholder="Para onde vamos? Busque uma cidade"
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
            Ver clima
          </ActionButton>

          <ActionButton type="button" onClick={searchByCurrentLocation} disabled={isLocating}>
            {isLocating ? "Buscando localizacao..." : "Usar minha localizacao"}
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
          <TodayHighlight>
            <h2>Resumo de hoje</h2>
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

            <TempBarChart>
              {todayBlocks.map((item) => {
                const temp = Math.round(item.main.temp);
                const barWidth = 24 + ((temp - minTemp) / tempRange) * 76;
                const tone = getTempBarTone(temp);

                return (
                  <TempBarRow key={`temp-${item.dt}`}>
                    <span>{formatHour(item.dt_txt)}</span>
                    <TempBarTrack>
                      <TempBarFill $width={barWidth} $tone={tone} />
                    </TempBarTrack>
                    <strong>{temp}°</strong>
                  </TempBarRow>
                );
              })}
            </TempBarChart>

            <TodayHighlightItem>
              <span>Media do periodo</span>
              <strong>
                {Math.round(todayBlocks.reduce((sum, item) => sum + item.main.temp, 0) / todayBlocks.length)}°
              </strong>
            </TodayHighlightItem>
          </TodayHighlight>

          <Stats>
            <h2>Resumo rapido</h2>
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
            <h2>Durante a semana</h2>
            {dailyItems.map((item, index) => (
              <DailyRow key={item.dt} style={{ ["--delay" as string]: `${index * 70}ms` }}>
                <DailyIcon>{renderWeatherIcon(item.weather[0]?.main ?? "clear", 22)}</DailyIcon>
                <span>{formatDay(item.dt_txt)}</span>
                <span>{item.weather[0]?.main ?? "Sem dados"}</span>
                <strong>{Math.round(item.main.temp)}°</strong>
              </DailyRow>
            ))}
          </Daily>

          <Hourly>
            <h2>Proximas horas</h2>
            <HourlyScroll>
              {nextHours.map((item, index) => (
                <HourlyItem key={item.dt} style={{ ["--delay" as string]: `${index * 55}ms` }}>
                  <HourlyIcon>{renderWeatherIcon(item.weather[0]?.main ?? "clear", 22)}</HourlyIcon>
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
