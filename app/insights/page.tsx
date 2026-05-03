import type { AuthenticatedSession } from "@/libs/auth/route-auth";
import { withProtectedPage } from "@/libs/auth/route-auth";
import { TopBar } from "@/components/top-bar";
import { ClimateInsights } from "@/components/climate-insights";
import { ClimateIntelligenceService } from "@/libs/services/climate-intelligence.service";
import { WeatherService } from "@/libs/services/weather.service";

async function InsightsPage(session: AuthenticatedSession) {
  const city = "Sao Paulo";

  const [current, forecast] = await Promise.all([
    WeatherService.getCurrentByCity(city),
    WeatherService.getForecastByCity(city),
  ]);

  const insights = ClimateIntelligenceService.buildInsights(current, forecast);

  return (
    <div>
      <TopBar userEmail={session.user.email} showSignOut />
      <ClimateInsights city={city} insights={insights} />
    </div>
  );
}

export default withProtectedPage(InsightsPage);
