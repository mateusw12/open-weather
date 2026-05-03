import type { AuthenticatedSession } from "@/libs/auth/route-auth";
import { withProtectedPage } from "@/libs/auth/route-auth";
import { TopBar } from "@/components/top-bar";
import { ClimateInsights } from "@/components/climate-insights";

async function InsightsPage(session: AuthenticatedSession) {
  return (
    <div>
      <TopBar userEmail={session.user.email} showSignOut />
      <ClimateInsights />
    </div>
  );
}

export default withProtectedPage(InsightsPage);
