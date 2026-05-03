import type { AuthenticatedSession } from "@/libs/auth/route-auth";
import { withProtectedPage } from "@/libs/auth/route-auth";
import { WeatherShell } from "@/components/weather-shell";
import { TopBar } from "@/components/top-bar";
import { WeatherService } from "@/libs/services/weather.service";

async function HomePage(session: AuthenticatedSession) {
  const defaultCity = "Sao Paulo";
  let current = null;
  let forecast = null;
  let weatherError: string | null = null;

  try {
    [current, forecast] = await Promise.all([
      WeatherService.getCurrentByCity(defaultCity),
      WeatherService.getForecastByCity(defaultCity),
    ]);
  } catch (error) {
    weatherError = error instanceof Error ? error.message : "Erro desconhecido.";
  }

  return (
    <div style={{ minHeight: "100dvh" }}>
      <TopBar userEmail={session.user.email} showSignOut />

      {current && forecast && !weatherError ? (
        <WeatherShell
          initialCity={defaultCity}
          initialCurrent={current}
          initialForecast={forecast}
        />
      ) : (
        <main
          style={{
            width: "min(740px, 100%)",
            margin: "2rem auto",
            padding: "1.4rem",
            borderRadius: "22px",
            backdropFilter: "blur(12px)",
            background: "linear-gradient(145deg, var(--ow-card-strong), var(--ow-card))",
            border: "1px solid var(--ow-border)",
          }}
        >
          <h1>Configure as variáveis de ambiente</h1>
          <p>
            Não foi possível buscar dados no OpenWeatherMap. Verifique
            NEXT_PUBLIC_WEATHER_API_KEY e credenciais OAuth no arquivo .env.local.
          </p>
          <p>{weatherError ?? "Erro desconhecido."}</p>
        </main>
      )}
    </div>
  );
}

export default withProtectedPage(HomePage);
