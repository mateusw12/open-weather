import type { AuthenticatedSession } from "@/libs/auth/route-auth";
import { withProtectedPage } from "@/libs/auth/route-auth";
import { redirect } from "next/navigation";
import { AppRoute } from "@/libs/enums/app-route.enum";

async function TodayPage(session: AuthenticatedSession) {
  void session;
  redirect(AppRoute.Home);
}

export default withProtectedPage(TodayPage);
