import styled from "@emotion/styled";
import type { CurrentWeatherDto, ForecastDto } from "@/libs/dto/weather";

type WeatherShellProps = {
  city: string;
  current: CurrentWeatherDto;
  forecast: ForecastDto;
};

const Shell = styled.main`
  width: min(1180px, 100%);
  margin: 0 auto;
  min-height: 100dvh;
  padding: 1rem 1rem 2rem;
  display: grid;
  gap: 1rem;
  align-content: start;

  @media (min-width: 768px) {
    padding: 1.6rem;
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Hero = styled.section`
  grid-column: 1 / -1;
  border-radius: 30px;
  padding: 1.5rem;
  backdrop-filter: blur(18px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 45px rgba(7, 20, 37, 0.35);
  animation: reveal 420ms ease-in-out both;

  @media (min-width: 768px) {
    padding: 2.2rem;
  }

  h1 {
    font-size: clamp(2.4rem, 6vw, 4.9rem);
    line-height: 0.92;
    letter-spacing: -0.04em;
    font-weight: 700;
  }

  p {
    margin-top: 0.55rem;
    color: rgba(234, 244, 255, 0.8);
  }
`;

const Stats = styled.section`
  border-radius: 24px;
  padding: 1.2rem;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  display: grid;
  gap: 0.7rem;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(234, 244, 255, 0.7);
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: rgba(234, 244, 255, 0.8);
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
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.14);

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(234, 244, 255, 0.7);
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

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.22);
    border-radius: 999px;
  }
`;

const HourlyItem = styled.article`
  padding: 0.85rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  scroll-snap-align: start;
  transition: transform 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  p {
    font-size: 0.85rem;
    color: rgba(234, 244, 255, 0.74);
  }

  strong {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.05rem;
  }
`;

function formatHour(dtTxt: string) {
  const [, hourMinute] = dtTxt.split(" ");
  return hourMinute?.slice(0, 5) ?? "--:--";
}

export function WeatherShell({ city, current, forecast }: WeatherShellProps) {
  const nextHours = forecast.list.slice(0, 10);

  return (
    <Shell>
      <Hero>
        <h1>{Math.round(current.main.temp)}°</h1>
        <p>{city}</p>
        <p>{current.weather[0]?.description ?? "Condição indisponível"}</p>
      </Hero>

      <Stats>
        <h2>Agora</h2>
        <StatItem>
          <span>Sensação</span>
          <strong>{Math.round(current.main.feels_like)}°</strong>
        </StatItem>
        <StatItem>
          <span>Umidade</span>
          <strong>{current.main.humidity}%</strong>
        </StatItem>
        <StatItem>
          <span>Vento</span>
          <strong>{current.wind.speed.toFixed(1)} m/s</strong>
        </StatItem>
      </Stats>

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
    </Shell>
  );
}
