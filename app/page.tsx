import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
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
          color: "rgba(238, 247, 255, 0.84)",
          fontSize: "0.92rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <Image src="/logo/logo.png" alt="Open Weather logo" width={34} height={34} priority />
          <p>Logado como {session.user.email ?? "usuário"}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <Link
            href="/about"
            style={{
              color: "rgba(110, 198, 189, 0.95)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sobre
          </Link>
          <SignOutButton />
        </div>
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
