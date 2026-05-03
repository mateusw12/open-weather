"use client";

import { useEffect } from "react";
import { AppRoute } from "@/libs/enums/app-route.enum";
import {
  AboutShell,
  Cta,
  CtaActions,
  CtaPrimary,
  CtaSecondary,
  Experience,
  ExperienceGrid,
  Feature,
  Flow,
  Hero,
  HeroBubble,
  HeroVisual,
  Reveal,
  Showcase,
  Tone,
  ToneGrid,
  ValueCard,
} from "@/components/about-story/styled";

export function AboutStory() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AboutShell>
      <Reveal data-reveal>
        <Hero>
          <h1>Seu clima, de um jeito simples</h1>
          <p>
            A proposta e deixar o tempo do seu dia facil de entender, bonito de ver e rapido de
            consultar. Tudo com cara de app premium, mas com linguagem humana.
          </p>

          <HeroVisual>
            <HeroBubble>
              <p>Experiencia</p>
              <p>Visual limpo, leve e acolhedor para qualquer pessoa.</p>
            </HeroBubble>
            <HeroBubble>
              <p>Foco</p>
              <p>Menos burocracia e mais previsao clara para decidir o dia.</p>
            </HeroBubble>
          </HeroVisual>
        </Hero>
      </Reveal>

      <Reveal data-reveal>
        <Flow>
          <ValueCard>
            <p>01</p>
            <h3>Rapido e leve</h3>
            <p>A abertura e instantanea e as informacoes chegam sem friccao.</p>
          </ValueCard>
          <ValueCard>
            <p>02</p>
            <h3>Funciona em qualquer tela</h3>
            <p>Mobile-first, com interacoes suaves para toque, mouse ou teclado.</p>
          </ValueCard>
          <ValueCard>
            <p>03</p>
            <h3>Dados em tempo real</h3>
            <p>Atualizacao continua para voce acompanhar mudancas de clima.</p>
          </ValueCard>
          <ValueCard>
            <p>04</p>
            <h3>Feito para o dia a dia</h3>
            <p>Consulta amigavel para sair de casa, viajar e planejar a rotina.</p>
          </ValueCard>
        </Flow>
      </Reveal>

      <Reveal data-reveal>
        <Experience>
          <h2>Experiencia que acompanha seu ritmo</h2>
          <ExperienceGrid>
            <Feature>
              <p>Busca inteligente</p>
              <p>Digita, recebe sugestoes e encontra cidades em segundos.</p>
            </Feature>
            <Feature>
              <p>Geolocalizacao</p>
              <p>Um toque e pronto: o clima de onde voce esta agora.</p>
            </Feature>
            <Feature>
              <p>Previsoes claras</p>
              <p>Visao por hora e por dia, com leitura simples e direta.</p>
            </Feature>
          </ExperienceGrid>
        </Experience>
      </Reveal>

      <Reveal data-reveal>
        <Showcase>
          <h2>Design que voce sente, nao so ve</h2>
          <ToneGrid>
            <Tone
              $tone="linear-gradient(145deg, rgba(120, 177, 255, 0.75), rgba(95, 126, 235, 0.72))"
            >
              <p>Base</p>
              <p>Azul luminoso para leitura confortavel.</p>
            </Tone>
            <Tone
              $tone="linear-gradient(145deg, rgba(255, 207, 136, 0.78), rgba(255, 161, 113, 0.72))"
            >
              <p>Destaque</p>
              <p>Toques quentes para guiar o olhar.</p>
            </Tone>
            <Tone
              $tone="linear-gradient(145deg, rgba(189, 233, 255, 0.72), rgba(140, 204, 255, 0.65))"
            >
              <p>Acabamento</p>
              <p>Glass leve com profundidade suave.</p>
            </Tone>
          </ToneGrid>
        </Showcase>
      </Reveal>

      <Reveal data-reveal>
        <Cta>
          <h2>Pronto para ver o clima agora?</h2>
          <p>
            Abra a Home e acompanhe o tempo com uma interface moderna, amigavel e feita para uso
            diario.
          </p>
          <CtaActions>
            <CtaPrimary href={AppRoute.Home}>Ver clima agora</CtaPrimary>
            <CtaSecondary href={AppRoute.Home}>Comecar</CtaSecondary>
          </CtaActions>
        </Cta>
      </Reveal>
    </AboutShell>
  );
}
