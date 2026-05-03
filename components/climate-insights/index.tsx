"use client";

import { useEffect, useState } from "react";
import {
  FaCloudRain,
  FaLightbulb,
  FaMapMarkerAlt,
  FaRegClock,
  FaTemperatureHigh,
  FaTint,
  FaWind,
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import type { CurrentWeatherDto, ForecastDto } from "@/libs/dto";
import { ClimateIntelligenceService } from "@/libs/services/climate-intelligence.service";
import {
  ForecastItem,
  ForecastStrip,
  Grid,
  Hero,
  HeroBadge,
  HeroHeader,
  HeroMetric,
  HeroMetrics,
  InsightCard,
  InsightsShell,
  SectionTitle,
  SearchButton,
  SearchInput,
  SearchRow,
  SnapshotCard,
  SnapshotGrid,
  StatusText,
} from "@/components/climate-insights/styled";

type WeatherPayload = {
  city: string;
  current: CurrentWeatherDto;
  forecast: ForecastDto;
};

function formatHour(dtTxt: string) {
  const [, hourMinute] = dtTxt.split(" ");
  return hourMinute?.slice(0, 5) ?? "--:--";
}

function weatherEmoji(main: string) {
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

export function ClimateInsights() {
  const { city, saveCity } = useWeatherStorage("Sao Paulo");
  const [query, setQuery] = useState(city);
  const [payload, setPayload] = useState<WeatherPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(`/api/weather/by-city?city=${encodeURIComponent(city)}`, {
          cache: "no-store",
        });
        const data = (await response.json()) as WeatherPayload | { message: string };

        if (!response.ok) {
          throw new Error("message" in data ? data.message : "Erro ao buscar insights.");
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

    void load();

    return () => {
      isMounted = false;
    };
  }, [city]);

  const insights = payload
    ? ClimateIntelligenceService.buildInsights(payload.current, payload.forecast)
    : [];
  const nextHours = payload?.forecast.list.slice(0, 6) ?? [];
  const todayWindow = payload?.forecast.list.slice(0, 8) ?? [];
  const hasData = Boolean(payload);
  const rainWindows = nextHours.filter((item) => {
    const weather = item.weather[0]?.main.toLowerCase() ?? "";
    return weather.includes("rain") || weather.includes("drizzle") || weather.includes("thunderstorm");
  }).length;
  const minTemp = todayWindow.length
    ? Math.round(Math.min(...todayWindow.map((item) => item.main.temp)))
    : 0;
  const maxTemp = todayWindow.length
    ? Math.round(Math.max(...todayWindow.map((item) => item.main.temp)))
    : 0;
  const currentMain = payload?.current.weather[0]?.main ?? "Clear";
  const currentDescription = payload?.current.weather[0]?.description ?? "clima estavel";

  function handleSearch() {
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    saveCity(trimmed);
  }

  return (
    <InsightsShell>
      <Hero>
        <HeroHeader>
          <HeroBadge>
            <FaLightbulb size={13} /> Inteligencia do clima
          </HeroBadge>
          <h1>
            {weatherEmoji(currentMain)} Insights em {payload?.city ?? city}
          </h1>
          <p>
            Leitura simples do clima de agora e das proximas horas com dicas praticas para sua rotina.
          </p>
        </HeroHeader>

        <HeroMetrics>
          <HeroMetric>
            <small>
              <FaMapMarkerAlt size={11} /> Cidade
            </small>
            <strong>{payload?.city ?? city}</strong>
          </HeroMetric>
          <HeroMetric>
            <small>
              <FaTemperatureHigh size={11} /> Agora
            </small>
            <strong>{hasData ? `${Math.round(payload.current.main.temp)}°` : "--"}</strong>
          </HeroMetric>
          <HeroMetric>
            <small>
              <FaTint size={11} /> Umidade
            </small>
            <strong>{hasData ? `${payload.current.main.humidity}%` : "--"}</strong>
          </HeroMetric>
          <HeroMetric>
            <small>
              <FaWind size={11} /> Vento
            </small>
            <strong>{hasData ? `${payload.current.wind.speed.toFixed(1)} m/s` : "--"}</strong>
          </HeroMetric>
        </HeroMetrics>

        <SearchRow
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <SearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Trocar cidade"
            aria-label="Trocar cidade"
          />
          <SearchButton type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Atualizar"}
          </SearchButton>
        </SearchRow>
      </Hero>

      {errorMessage && <StatusText>{errorMessage}</StatusText>}

      {!errorMessage && hasData && (
        <>
          <SectionTitle>
            <WiDaySunny size={20} /> Panorama rapido
          </SectionTitle>

          <SnapshotGrid>
            <SnapshotCard>
              <small>
                <FaTemperatureHigh size={12} /> Faixa de hoje
              </small>
              <strong>
                {minTemp}° / {maxTemp}°
              </strong>
              <p>Variacao prevista para o periodo mais proximo.</p>
            </SnapshotCard>

            <SnapshotCard>
              <small>
                <FaCloudRain size={12} /> Chuva nas proximas horas
              </small>
              <strong>{rainWindows > 0 ? `${rainWindows} blocos com chuva` : "Sem sinal de chuva"}</strong>
              <p>Analise das proximas 6 janelas de previsao.</p>
            </SnapshotCard>

            <SnapshotCard>
              <small>
                <FaRegClock size={12} /> Condicao atual
              </small>
              <strong>{weatherEmoji(currentMain)} {currentDescription}</strong>
              <p>Base para decisões de deslocamento e atividades.</p>
            </SnapshotCard>
          </SnapshotGrid>

          <SectionTitle>
            <FaRegClock size={16} /> Proximas horas
          </SectionTitle>

          <ForecastStrip>
            {nextHours.map((item) => (
              <ForecastItem key={item.dt}>
                <small>{formatHour(item.dt_txt)}</small>
                <strong>{weatherEmoji(item.weather[0]?.main ?? "clear")}</strong>
                <p>{Math.round(item.main.temp)}°</p>
              </ForecastItem>
            ))}
          </ForecastStrip>
        </>
      )}

      <SectionTitle>
        <FaLightbulb size={16} /> Recomendações para você
      </SectionTitle>

      <Grid>
        {insights.map((insight) => (
          <InsightCard key={insight.id}>
            <strong>{insight.emoji}</strong>
            <h2>{insight.title}</h2>
            <p>{insight.description}</p>
          </InsightCard>
        ))}

        {!isLoading && !errorMessage && insights.length === 0 && (
          <StatusText>Nenhum insight encontrado para esta cidade.</StatusText>
        )}
      </Grid>
    </InsightsShell>
  );
}
