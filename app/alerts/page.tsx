import type { AuthenticatedSession } from "@/libs/auth/route-auth";
import { withProtectedPage } from "@/libs/auth/route-auth";
import { TopBar } from "@/components/top-bar";
import { AlertsCenter } from "@/components/alerts-center";
import { ClimateIntelligenceService } from "@/libs/services/climate-intelligence.service";
import { WeatherService } from "@/libs/services/weather.service";

async function AlertsPage(session: AuthenticatedSession) {
  const city = "Sao Paulo";

  const [current, forecast] = await Promise.all([
    WeatherService.getCurrentByCity(city),
    WeatherService.getForecastByCity(city),
  ]);

  const alerts = ClimateIntelligenceService.buildAlerts(current, forecast);

  return (
    <div>
      <TopBar userEmail={session.user.email} showSignOut />
      <AlertsCenter city={city} alerts={alerts} />
    </div>
  );
}

export default withProtectedPage(AlertsPage);
