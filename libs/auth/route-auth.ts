import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { ReactElement } from "react";
import { authOptions } from "@/libs/auth/auth";
import { AppRoute } from "@/libs/enums/app-route.enum";

export type AuthenticatedSession = Session & {
  user: NonNullable<Session["user"]>;
};

type ProtectedPageRenderer = (
  session: AuthenticatedSession,
) => Promise<ReactElement> | ReactElement;
type GuestPageRenderer = () => Promise<ReactElement> | ReactElement;
type ProtectedRouteHandler = (
  request: Request,
  session: AuthenticatedSession,
) => Promise<Response> | Response;

async function readSession() {
  return getServerSession(authOptions);
}

export function withProtectedPage(renderer: ProtectedPageRenderer) {
  return async function ProtectedPage() {
    const session = await readSession();

    if (!session?.user) {
      redirect(AppRoute.Login);
    }

    const authenticatedSession: AuthenticatedSession = {
      ...session,
      user: session.user,
    };

    return renderer(authenticatedSession);
  };
}

export function withGuestPage(renderer: GuestPageRenderer) {
  return async function GuestPage() {
    const session = await readSession();

    if (session?.user) {
      redirect(AppRoute.Home);
    }

    return renderer();
  };
}

export function withProtectedRoute(handler: ProtectedRouteHandler) {
  return async function protectedRoute(request: Request) {
    const session = await readSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    const authenticatedSession: AuthenticatedSession = {
      ...session,
      user: session.user,
    };

    return handler(request, authenticatedSession);
  };
}
