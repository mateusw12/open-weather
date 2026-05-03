import Image from "next/image";
import Link from "next/link";

const cardStyle: React.CSSProperties = {
  borderRadius: "24px",
  padding: "1.25rem",
  background: "linear-gradient(145deg, var(--ow-card-strong), var(--ow-card))",
  border: "1px solid var(--ow-border)",
  backdropFilter: "blur(14px)",
};

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "min(1100px, 100%)",
        margin: "0 auto",
        padding: "1rem 1rem 2rem",
        display: "grid",
        gap: "1rem",
      }}
    >
      <section
        style={{
          ...cardStyle,
          display: "grid",
          gap: "0.9rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <Image src="/logo/logo.png" alt="Open Weather logo" width={56} height={56} priority />
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", letterSpacing: "-0.03em" }}>
            Sobre o Open Weather
          </h1>
        </div>

        <p style={{ color: "rgba(238, 247, 255, 0.86)", lineHeight: 1.6 }}>
          O Open Weather e uma aplicacao moderna de previsao do tempo criada com foco em
          experiencia premium. O objetivo e entregar consultas climaticas com visual imersivo,
          performance e fluxo de uso intuitivo em qualquer dispositivo.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <article style={cardStyle}>
          <h2 style={{ color: "rgba(110, 198, 189, 0.95)", marginBottom: "0.55rem" }}>
            Tecnologias
          </h2>
          <p style={{ color: "rgba(238, 247, 255, 0.82)", lineHeight: 1.55 }}>
            Next.js 16, React 19, TypeScript, Emotion e NextAuth para autenticacao com Google e
            GitHub. A previsao e consumida da API OpenWeatherMap.
          </p>
        </article>

        <article style={cardStyle}>
          <h2 style={{ color: "rgba(110, 198, 189, 0.95)", marginBottom: "0.55rem" }}>
            Experiencia
          </h2>
          <p style={{ color: "rgba(238, 247, 255, 0.82)", lineHeight: 1.55 }}>
            Busca com sugestoes, geolocalizacao, persistencia da ultima cidade e visual responsivo
            mobile-first com animacoes suaves e leitura clara dos dados.
          </p>
        </article>

        <article style={cardStyle}>
          <h2 style={{ color: "rgba(110, 198, 189, 0.95)", marginBottom: "0.55rem" }}>
            Design
          </h2>
          <p style={{ color: "rgba(238, 247, 255, 0.82)", lineHeight: 1.55 }}>
            A interface segue uma paleta 60/30/10 com base azul, tons azure e destaque laranja,
            criando equilibrio entre profundidade visual e legibilidade.
          </p>
        </article>
      </section>

      <section style={{ ...cardStyle, display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            border: "1px solid var(--ow-border)",
            background: "rgba(33, 69, 125, 0.44)",
            color: "var(--ow-text)",
            borderRadius: "12px",
            padding: "0.6rem 0.95rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Ir para Home
        </Link>

        <Link
          href="/login"
          style={{
            border: "1px solid var(--ow-border)",
            background: "rgba(38, 125, 170, 0.56)",
            color: "var(--ow-text)",
            borderRadius: "12px",
            padding: "0.6rem 0.95rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Ir para Login
        </Link>
      </section>
    </main>
  );
}
