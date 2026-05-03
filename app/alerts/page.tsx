import type { AuthenticatedSession } from "@/libs/auth/route-auth";
import { withProtectedPage } from "@/libs/auth/route-auth";
import { TopBar } from "@/components/top-bar";
import { AlertsCenter } from "@/components/alerts-center";

async function AlertsPage(session: AuthenticatedSession) {
  return (
    <div>
      <TopBar userEmail={session.user.email} showSignOut />
      <AlertsCenter />
    </div>
  );
}

export default withProtectedPage(AlertsPage);
