import styled from "@emotion/styled";
import { auth, signOut } from "@/auth";
import { WeatherShell } from "@/components/weather-shell";
import { WeatherService } from "@/libs/services/weather-service";

const Page = styled.div`
  min-height: 100dvh;
`;

const TopBar = styled.header`
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 1rem 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: rgba(234, 244, 255, 0.8);
    font-size: 0.92rem;
  }

  button {
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.1);
    color: #eaf4ff;
    border-radius: 12px;
    padding: 0.55rem 0.9rem;
    cursor: pointer;
    transition: transform 180ms ease-in-out, background 180ms ease-in-out;
  }

  button:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.16);
  }
`;

const EmptyState = styled.main`
  width: min(740px, 100%);
  margin: 2rem auto;
  padding: 1.4rem;
  border-radius: 22px;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.11);
  border: 1px solid rgba(255, 255, 255, 0.18);

  h1 {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
  }

  p {
    margin-top: 0.6rem;
    color: rgba(234, 244, 255, 0.78);
  }
`;

export default async function Home() {
  const session = await auth();
  const defaultCity = "Sao Paulo";
  let current = null;
  let forecast = null;
  let weatherError: string | null = null;

  if (!session?.user) {
    return null;
  }

  try {
    [current, forecast] = await Promise.all([
      WeatherService.getCurrentByCity(defaultCity),
      WeatherService.getForecastByCity(defaultCity),
    ]);
  } catch (error) {
    weatherError = error instanceof Error ? error.message : "Erro desconhecido.";
  }

  return (
    <Page>
      <TopBar>
        <p>Logado como {session.user.email}</p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button type="submit">Sair</button>
        </form>
      </TopBar>

      {current && forecast && !weatherError ? (
        <WeatherShell
          initialCity={defaultCity}
          initialCurrent={current}
          initialForecast={forecast}
        />
      ) : (
        <EmptyState>
          <h1>Configure as variáveis de ambiente</h1>
          <p>
            Não foi possível buscar dados no OpenWeatherMap. Verifique
            NEXT_PUBLIC_WEATHER_API_KEY e credenciais OAuth no arquivo .env.local.
          </p>
          <p>{weatherError ?? "Erro desconhecido."}</p>
        </EmptyState>
      )}
    </Page>
  );
}
