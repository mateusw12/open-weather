import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";
import { WeatherShell } from "@/components/weather-shell";
import { WeatherService } from "@/libs/services/weather-service";

export default async function Home() {
  const session = await getServerSession(authOptions);
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
    <div style={{ minHeight: "100dvh" }}>
      <header
        style={{
          width: "min(1180px, 100%)",
          margin: "0 auto",
          padding: "1rem 1rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "rgba(234, 244, 255, 0.8)",
          fontSize: "0.92rem",
        }}
      >
        <p>Logado como {session.user.email ?? "usuário"}</p>
        <SignOutButton />
      </header>

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
            background: "rgba(255, 255, 255, 0.11)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
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
