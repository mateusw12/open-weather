"use client";

import { useEffect, useState } from "react";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import type { CurrentWeatherDto, ForecastDto } from "@/libs/dto";
import { ClimateIntelligenceService } from "@/libs/services/climate-intelligence.service";
import {
  Grid,
  Hero,
  InsightCard,
  InsightsShell,
  SearchButton,
  SearchInput,
  SearchRow,
  StatusText,
} from "@/components/climate-insights/styled";

type WeatherPayload = {
  city: string;
  current: CurrentWeatherDto;
  forecast: ForecastDto;
};

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
        <h1>Insights do clima em {payload?.city ?? city}</h1>
        <p>Transformamos dados em recomendacoes praticas para o seu dia.</p>

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
