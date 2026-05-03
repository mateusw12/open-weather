"use client";

import type { InsightItem } from "@/libs/services/climate-intelligence.service";
import {
  Grid,
  Hero,
  InsightCard,
  InsightsShell,
} from "@/components/climate-insights/styled";

type ClimateInsightsProps = {
  city: string;
  insights: InsightItem[];
};

export function ClimateInsights({ city, insights }: ClimateInsightsProps) {
  return (
    <InsightsShell>
      <Hero>
        <h1>Insights do clima em {city}</h1>
        <p>Transformamos dados em recomendacoes praticas para o seu dia.</p>
      </Hero>

      <Grid>
        {insights.map((insight) => (
          <InsightCard key={insight.id}>
            <strong>{insight.emoji}</strong>
            <h2>{insight.title}</h2>
            <p>{insight.description}</p>
          </InsightCard>
        ))}
      </Grid>
    </InsightsShell>
  );
}
