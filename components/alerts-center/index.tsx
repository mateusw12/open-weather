"use client";

import { useEffect, useState } from "react";
import { useWeatherStorage } from "@/hooks/use-weather-storage";
import type { CurrentWeatherDto, ForecastDto } from "@/libs/dto";
import { ClimateIntelligenceService } from "@/libs/services/climate-intelligence.service";
import {
  AlertCard,
  AlertsShell,
  Hero,
  List,
  SearchButton,
  SearchInput,
  SearchRow,
  StatusText,
} from "@/components/alerts-center/styled";

type WeatherPayload = {
  city: string;
  current: CurrentWeatherDto;
  forecast: ForecastDto;
};

export function AlertsCenter() {
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
          throw new Error("message" in data ? data.message : "Erro ao buscar alertas.");
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

  const alerts = payload
    ? ClimateIntelligenceService.buildAlerts(payload.current, payload.forecast)
    : [];

  function handleSearch() {
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    saveCity(trimmed);
  }

  return (
    <AlertsShell>
      <Hero>
        <h1>Alertas de clima em {payload?.city ?? city}</h1>
        <p>Notificacoes locais para voce agir cedo e evitar surpresas.</p>

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

      <List>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} $level={alert.level}>
            <h2>{alert.title}</h2>
            <p>{alert.message}</p>
            <small>{alert.when}</small>
          </AlertCard>
        ))}

        {!isLoading && !errorMessage && alerts.length === 0 && (
          <StatusText>Nenhum alerta encontrado para esta cidade.</StatusText>
        )}
      </List>
    </AlertsShell>
  );
}
