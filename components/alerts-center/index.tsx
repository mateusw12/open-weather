"use client";

import type { AlertItem } from "@/libs/services/climate-intelligence.service";
import { AlertCard, AlertsShell, Hero, List } from "@/components/alerts-center/styled";

type AlertsCenterProps = {
  city: string;
  alerts: AlertItem[];
};

export function AlertsCenter({ city, alerts }: AlertsCenterProps) {
  return (
    <AlertsShell>
      <Hero>
        <h1>Alertas de clima em {city}</h1>
        <p>Notificacoes locais para voce agir cedo e evitar surpresas.</p>
      </Hero>

      <List>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} $level={alert.level}>
            <h2>{alert.title}</h2>
            <p>{alert.message}</p>
            <small>{alert.when}</small>
          </AlertCard>
        ))}
      </List>
    </AlertsShell>
  );
}
