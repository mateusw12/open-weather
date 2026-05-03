import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";
import { AppRoute } from "@/libs/enums/app-route.enum";

type TopBarProps = {
  userEmail?: string | null;
  showSignOut?: boolean;
};

const navLinkStyle: React.CSSProperties = {
  color: "rgba(242, 243, 255, 0.95)",
  fontWeight: 600,
  textDecoration: "none",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "999px",
  padding: "0.5rem 0.85rem",
  backdropFilter: "blur(8px)",
  background: "rgba(255, 255, 255, 0.12)",
};

export function TopBar({ userEmail, showSignOut = false }: TopBarProps) {
  return (
    <header
      style={{
        width: "min(1220px, 100%)",
        margin: "0 auto",
        padding: "1rem 1rem 0.4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "rgba(238, 247, 255, 0.92)",
        fontSize: "0.95rem",
        position: "sticky",
        top: "0.45rem",
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          borderRadius: "999px",
          padding: "0.45rem 0.7rem",
          backdropFilter: "blur(12px)",
          background:
            "linear-gradient(120deg, rgba(120, 179, 255, 0.23), rgba(255, 194, 106, 0.15))",
        }}
      >
        <Image src="/logo/logo.png" alt="Open Weather logo" width={46} height={46} priority />
        <div>
          <p style={{ fontWeight: 700 }}>Open Weather</p>
          <p style={{ fontSize: "0.8rem", color: "rgba(238, 247, 255, 0.78)" }}>
            {userEmail ? `Ola, ${userEmail}` : "Previsao amigavel para o seu dia"}
          </p>
        </div>
      </div>

      <nav style={{ display: "flex", alignItems: "center", gap: "0.7rem", flexWrap: "wrap" }}>
        <Link href={AppRoute.Home} style={navLinkStyle}>
          Home
        </Link>
        <Link href={AppRoute.Today} style={navLinkStyle}>
          Hoje
        </Link>
        <Link href={AppRoute.Alerts} style={navLinkStyle}>
          Alertas
        </Link>
        <Link href={AppRoute.Insights} style={navLinkStyle}>
          Insights
        </Link>
        <Link href={AppRoute.About} style={navLinkStyle}>
          Sobre
        </Link>
        {showSignOut && <SignOutButton />}
      </nav>
    </header>
  );
}
