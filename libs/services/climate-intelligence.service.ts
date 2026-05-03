import type { CurrentWeatherDto, ForecastDto } from "@/libs/dto";

export type AlertLevel = "info" | "warning" | "danger";

export interface AlertItem {
  id: string;
  level: AlertLevel;
  title: string;
  message: string;
  when: string;
}

export interface InsightItem {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

function getNextHoursTemps(forecast: ForecastDto, hours: number) {
  const blocks = Math.max(1, Math.ceil(hours / 3));
  return forecast.list.slice(0, blocks).map((item) => item.main.temp);
}

function getTempSwing(forecast: ForecastDto, hours: number) {
  const temps = getNextHoursTemps(forecast, hours);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  return max - min;
}

export class ClimateIntelligenceService {
  static buildAlerts(current: CurrentWeatherDto, forecast: ForecastDto): AlertItem[] {
    const alerts: AlertItem[] = [];
    const next12 = forecast.list.slice(0, 4);
    const next24 = forecast.list.slice(0, 8);

    const hasRainSoon = next12.some((item) => {
      const key = item.weather[0]?.main.toLowerCase() ?? "";
      return key.includes("rain") || key.includes("drizzle") || key.includes("thunderstorm");
    });

    if (hasRainSoon) {
      alerts.push({
        id: "rain-soon",
        level: "warning",
        title: "Chance de chuva nas proximas horas",
        message: "Leve guarda-chuva para evitar surpresa no caminho.",
        when: "Proximas 12 horas",
      });
    }

    const tempSwing = getTempSwing(forecast, 24);
    if (tempSwing >= 7) {
      alerts.push({
        id: "temp-swing",
        level: "warning",
        title: "Mudanca brusca de temperatura",
        message: "A variacao prevista e alta. Uma camada extra pode ajudar.",
        when: "Proximas 24 horas",
      });
    }

    const strongWind = next24.some((item) => item.wind.speed >= 10);
    if (strongWind) {
      alerts.push({
        id: "strong-wind",
        level: "info",
        title: "Vento forte previsto",
        message: "Atencao em areas abertas e no deslocamento de bike ou moto.",
        when: "Hoje",
      });
    }

    if (current.main.humidity >= 85) {
      alerts.push({
        id: "high-humidity",
        level: "info",
        title: "Umidade alta",
        message: "Pode haver sensacao de abafamento em alguns periodos.",
        when: "Agora",
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        id: "all-clear",
        level: "info",
        title: "Sem alertas importantes",
        message: "Clima estavel para hoje. Bom momento para planos ao ar livre.",
        when: "Agora",
      });
    }

    return alerts;
  }

  static buildInsights(current: CurrentWeatherDto, forecast: ForecastDto): InsightItem[] {
    const insights: InsightItem[] = [];
    const condition = current.weather[0]?.main.toLowerCase() ?? "clear";
    const feelsLike = current.main.feels_like;
    const rainProbability = forecast.list
      .slice(0, 6)
      .filter((item) => (item.weather[0]?.main.toLowerCase() ?? "").includes("rain")).length;

    if (condition.includes("clear") || condition.includes("cloud")) {
      insights.push({
        id: "outdoor",
        emoji: "🌤️",
        title: "Bom momento para atividades ao ar livre",
        description: "A condicao atual esta favoravel para uma caminhada leve.",
      });
    }

    if (rainProbability >= 2) {
      insights.push({
        id: "rain-afternoon",
        emoji: "🌧️",
        title: "Alta chance de chuva mais tarde",
        description: "Vale antecipar compromissos externos e levar guarda-chuva.",
      });
    }

    if (feelsLike <= 17) {
      insights.push({
        id: "coat",
        emoji: "🧥",
        title: "Leve um casaco",
        description: "A sensacao termica esta baixa, especialmente com vento.",
      });
    }

    if (feelsLike >= 30) {
      insights.push({
        id: "water",
        emoji: "💧",
        title: "Hidratacao em foco",
        description: "Calor elevado. Beba agua e prefira ambientes ventilados.",
      });
    }

    if (insights.length < 3) {
      insights.push({
        id: "routine",
        emoji: "📌",
        title: "Planeje seu dia com antecedencia",
        description: "Olhe a previsao por hora para escolher os melhores horarios.",
      });
    }

    return insights.slice(0, 4);
  }
}
