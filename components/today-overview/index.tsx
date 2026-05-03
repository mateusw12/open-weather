"use client";

import { useEffect, useMemo, useState } from "react";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { WiDayCloudy, WiDaySunny, WiHumidity, WiRain, WiSnow, WiStrongWind } from "react-icons/wi";
import type { CurrentWeatherDto, ForecastDto } from "@/libs/dto";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import { formatForecastHour, formatTimeFromUnix } from "@/libs/utils/weather";
import {
  Card,
  ErrorText,
  Grid,
  Hero,
  HeroIcon,
  HourIcon,
  HourlyItem,
  HourlyStrip,
  LoadingCard,
  StatList,
  StatRow,
  TodayShell,
} from "@/components/today-overview/styled";

type WeatherPayload = {
  city: string;
  current: CurrentWeatherDto;
  forecast: ForecastDto;
};

function getThemeByWeather(main: string, temp: number) {
  const key = main.toLowerCase();

  if (key.includes("snow") || temp <= 8) {
    return {
      heroTone: "linear-gradient(145deg, rgba(165, 216, 255, 0.3), rgba(201, 235, 255, 0.2))",
      cardTone: "linear-gradient(145deg, rgba(182, 225, 255, 0.22), rgba(216, 241, 255, 0.14))",
      hourlyTone: "rgba(205, 236, 255, 0.24)",
      borderTone: "rgba(201, 232, 255, 0.46)",
    };
  }

  if (key.includes("rain") || key.includes("drizzle") || key.includes("thunderstorm")) {
    return {
      heroTone: "linear-gradient(145deg, rgba(121, 165, 230, 0.28), rgba(120, 206, 255, 0.16))",
      cardTone: "linear-gradient(145deg, rgba(130, 190, 244, 0.2), rgba(175, 222, 255, 0.14))",
      hourlyTone: "rgba(162, 214, 250, 0.24)",
      borderTone: "rgba(173, 215, 249, 0.42)",
    };
  }

  if (key.includes("clear") || temp >= 30) {
    return {
      heroTone: "linear-gradient(145deg, rgba(255, 191, 113, 0.3), rgba(255, 137, 91, 0.2))",
      cardTone: "linear-gradient(145deg, rgba(255, 188, 119, 0.24), rgba(255, 225, 166, 0.14))",
      hourlyTone: "rgba(255, 206, 143, 0.24)",
      borderTone: "rgba(255, 209, 150, 0.5)",
    };
  }

  return {
    heroTone: "linear-gradient(145deg, rgba(137, 189, 255, 0.24), rgba(255, 211, 142, 0.16))",
    cardTone: "linear-gradient(145deg, rgba(193, 224, 255, 0.2), rgba(255, 222, 171, 0.14))",
    hourlyTone: "rgba(214, 233, 255, 0.2)",
    borderTone: "rgba(236, 241, 255, 0.42)",
  };
}

function renderWeatherIcon(main: string, size: number) {
  const key = main.toLowerCase();

  if (key.includes("snow")) {
    return <WiSnow size={size} />;
  }

  if (key.includes("rain") || key.includes("drizzle") || key.includes("thunderstorm")) {
    return <WiRain size={size} />;
  }

  if (key.includes("cloud")) {
    return <WiDayCloudy size={size} />;
  }

  return <WiDaySunny size={size} />;
}

export function TodayOverview() {
  const { city } = useWeatherStorage("Sao Paulo");
  const [payload, setPayload] = useState<WeatherPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(`/api/weather/by-city?city=${encodeURIComponent(city)}`, {
          cache: "no-store",
        });
        const data = (await response.json()) as WeatherPayload | { message: string };

        if (!response.ok) {
          throw new Error("message" in data ? data.message : "Falha ao carregar previsao de hoje.");
        }

        if (isMounted) {
          setPayload(data as WeatherPayload);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Erro inesperado.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadWeather();

    return () => {
      isMounted = false;
    };
  }, [city]);

  const current = payload?.current;
  const forecast = payload?.forecast;

  const weatherMain = current?.weather[0]?.main ?? "clear";
  const weatherDescription = current?.weather[0]?.description ?? "Sem dados";

  const theme = useMemo(() => getThemeByWeather(weatherMain, current?.main.temp ?? 22), [weatherMain, current?.main.temp]);

  if (isLoading) {
    return (
      <TodayShell>
        <LoadingCard />
        <LoadingCard />
      </TodayShell>
    );
  }

  if (!payload || !current || !forecast) {
    return (
      <TodayShell>
        <ErrorText>{errorMessage ?? "Nao foi possivel carregar a previsao de hoje."}</ErrorText>
      </TodayShell>
    );
  }

  const timezone = forecast.city.timezone;
  const sunrise = formatTimeFromUnix(forecast.city.sunrise, timezone);
  const sunset = formatTimeFromUnix(forecast.city.sunset, timezone);
  const todayTemps = forecast.list.slice(0, 8).map((item) => item.main.temp);
  const minTemp = Math.round(Math.min(...todayTemps));
  const maxTemp = Math.round(Math.max(...todayTemps));
  const nextHours = forecast.list.slice(0, 8);

  return (
    <TodayShell>
      <Hero $tone={theme.heroTone} $borderTone={theme.borderTone}>
        <HeroIcon>
          {renderWeatherIcon(weatherMain, 44)}
        </HeroIcon>
        <h1>Resumo de hoje em {payload.city}</h1>
        <p>
          {weatherDescription}. Sensacao atual de {Math.round(current.main.feels_like)}° e tendencia para um dia {maxTemp >= 30 ? "quente" : minTemp <= 8 ? "frio" : "equilibrado"}.
        </p>
      </Hero>

      <Grid>
        <Card $tone={theme.cardTone} $borderTone={theme.borderTone}>
          <h2>Panorama do dia</h2>
          <StatList>
            <StatRow>
              <span>Nascer do sol</span>
              <strong>
                <WiDaySunny size={20} /> {sunrise}
              </strong>
            </StatRow>
            <StatRow>
              <span>Por do sol</span>
              <strong>
                <WiDayCloudy size={20} /> {sunset}
              </strong>
            </StatRow>
            <StatRow>
              <span>Temp. minima</span>
              <strong>
                <FaTemperatureArrowDown size={14} /> {minTemp}°
              </strong>
            </StatRow>
            <StatRow>
              <span>Temp. maxima</span>
              <strong>
                <FaTemperatureArrowUp size={14} /> {maxTemp}°
              </strong>
            </StatRow>
            <StatRow>
              <span>Sensacao atual</span>
              <strong>
                {renderWeatherIcon(weatherMain, 18)} {Math.round(current.main.feels_like)}°
              </strong>
            </StatRow>
            <StatRow>
              <span>Umidade</span>
              <strong>
                <WiHumidity size={20} /> {current.main.humidity}%
              </strong>
            </StatRow>
            <StatRow>
              <span>Vento</span>
              <strong>
                <WiStrongWind size={22} /> {current.wind.speed.toFixed(1)} m/s
              </strong>
            </StatRow>
          </StatList>
        </Card>

        <Card $tone={theme.cardTone} $borderTone={theme.borderTone}>
          <h2>Proximas horas</h2>
          <HourlyStrip>
            {nextHours.map((item) => {
              return (
                <HourlyItem key={item.dt} $tone={theme.hourlyTone} $borderTone={theme.borderTone}>
                  <HourIcon>{renderWeatherIcon(item.weather[0]?.main ?? "clear", 24)}</HourIcon>
                  <p>{formatForecastHour(item.dt_txt)}</p>
                  <strong>{Math.round(item.main.temp)}°</strong>
                  <p>{item.weather[0]?.description ?? "Sem dados"}</p>
                </HourlyItem>
              );
            })}
          </HourlyStrip>
        </Card>
      </Grid>
    </TodayShell>
  );
}
