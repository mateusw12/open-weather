import { StatItem, Stats } from "@/components/weather-shell/styled";

type QuickStatsPanelProps = {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
};

export function QuickStatsPanel({ feelsLike, humidity, windSpeed, pressure }: QuickStatsPanelProps) {
  return (
    <Stats>
      <h2>Resumo rapido</h2>
      <p data-sub>Visao instantanea do clima atual para decidir seu proximo passo.</p>
      <StatItem>
        <span>Sensação</span>
        <strong>{Math.round(feelsLike)}°</strong>
      </StatItem>
      <StatItem>
        <span>Umidade</span>
        <strong>{humidity}%</strong>
      </StatItem>
      <StatItem>
        <span>Vento</span>
        <strong>{windSpeed.toFixed(1)} m/s</strong>
      </StatItem>
      <StatItem>
        <span>Pressão</span>
        <strong>{pressure} hPa</strong>
      </StatItem>
    </Stats>
  );
}
