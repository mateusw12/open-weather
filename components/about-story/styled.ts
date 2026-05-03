import styled from "@emotion/styled";
import Link from "next/link";

export const AboutShell = styled.main`
  width: min(1160px, 100%);
  margin: 0 auto;
  min-height: 100dvh;
  padding: 1rem 1rem 2.5rem;
  display: grid;
  gap: 1rem;
  align-content: start;
`;

export const TopBar = styled.header`
  position: sticky;
  top: 0.8rem;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.55rem 0.7rem;
  border-radius: 999px;
  backdrop-filter: blur(16px);
  background: linear-gradient(120deg, rgba(138, 190, 255, 0.22), rgba(255, 196, 118, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.36);
`;

export const TopBarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const RoundLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  padding: 0.5rem 0.86rem;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.88rem;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.26);
  }
`;

export const BrandChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #ffffff;

  p:first-of-type {
    font-size: 0.92rem;
    font-weight: 800;
  }

  p:last-of-type {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.85);
  }
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 34px;
  padding: 2rem 1.2rem 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.34);
  backdrop-filter: blur(12px);
  background:
    radial-gradient(circle at 14% 18%, rgba(255, 221, 168, 0.45), transparent 34%),
    radial-gradient(circle at 90% 8%, rgba(155, 202, 255, 0.4), transparent 28%),
    linear-gradient(150deg, rgba(115, 153, 241, 0.72), rgba(88, 108, 215, 0.66));

  h1 {
    max-width: 16ch;
    font-size: clamp(2rem, 8vw, 4.3rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    color: #ffffff;
    text-shadow: 0 12px 28px rgba(8, 14, 35, 0.22);
  }

  p {
    margin-top: 0.8rem;
    max-width: 45ch;
    color: rgba(249, 253, 255, 0.9);
    line-height: 1.5;
  }

  @media (min-width: 768px) {
    padding: 2.4rem 2rem 1.8rem;
  }
`;

export const HeroVisual = styled.div`
  margin-top: 1.3rem;
  display: grid;
  gap: 0.7rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const HeroBubble = styled.article`
  border-radius: 20px;
  padding: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);

  p:first-of-type {
    font-size: 0.77rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 247, 236, 0.9);
  }

  p:last-of-type {
    margin-top: 0.35rem;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.02rem;
  }
`;

export const Flow = styled.section`
  display: grid;
  gap: 0.9rem;

  @media (min-width: 820px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const ValueCard = styled.article`
  border-radius: 24px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.33);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.22);
  }

  h3 {
    margin-top: 0.6rem;
    color: #ffffff;
    letter-spacing: -0.015em;
  }

  p {
    margin-top: 0.4rem;
    color: rgba(248, 252, 255, 0.9);
    line-height: 1.46;
  }

  @media (min-width: 820px) {
    &:nth-of-type(1) {
      grid-column: 1 / 6;
    }

    &:nth-of-type(2) {
      grid-column: 6 / 10;
    }

    &:nth-of-type(3) {
      grid-column: 10 / 13;
    }

    &:nth-of-type(4) {
      grid-column: 3 / 9;
    }
  }
`;

export const Experience = styled.section`
  border-radius: 30px;
  padding: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.34);
  backdrop-filter: blur(12px);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.17), rgba(255, 217, 163, 0.12));

  h2 {
    color: #ffffff;
    font-size: clamp(1.25rem, 3vw, 2rem);
    letter-spacing: -0.02em;
  }

  @media (min-width: 768px) {
    padding: 1.35rem;
  }
`;

export const ExperienceGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.72rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Feature = styled.article`
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.32);
  padding: 0.85rem;
  background: rgba(255, 255, 255, 0.15);

  p:first-of-type {
    color: rgba(255, 246, 230, 0.93);
    text-transform: uppercase;
    font-size: 0.77rem;
    letter-spacing: 0.06em;
  }

  p:last-of-type {
    margin-top: 0.5rem;
    color: #ffffff;
    line-height: 1.45;
  }
`;

export const Showcase = styled.section`
  border-radius: 30px;
  padding: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.34);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(171, 209, 255, 0.15));

  h2 {
    color: #ffffff;
    font-size: clamp(1.25rem, 3vw, 2rem);
    letter-spacing: -0.02em;
  }
`;

export const ToneGrid = styled.div`
  margin-top: 0.95rem;
  display: grid;
  gap: 0.7rem;

  @media (min-width: 768px) {
    grid-template-columns: 1.1fr 1.1fr 0.8fr;
  }
`;

export const Tone = styled.article<{ $tone: string }>`
  border-radius: 22px;
  min-height: 112px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: ${({ $tone }) => $tone};
  padding: 0.82rem;
  display: grid;
  align-content: end;
  color: #ffffff;
  box-shadow: 0 16px 30px rgba(11, 19, 44, 0.2);

  p:first-of-type {
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: rgba(255, 255, 255, 0.9);
  }

  p:last-of-type {
    margin-top: 0.45rem;
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const Cta = styled.section`
  text-align: center;
  border-radius: 32px;
  padding: 1.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.36);
  background: linear-gradient(155deg, rgba(138, 184, 255, 0.28), rgba(255, 204, 136, 0.24));
  backdrop-filter: blur(14px);

  h2 {
    color: #ffffff;
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    letter-spacing: -0.03em;
  }

  p {
    margin: 0.7rem auto 0;
    max-width: 48ch;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.5;
  }
`;

export const CtaActions = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
`;

export const CtaPrimary = styled(Link)`
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  padding: 0.78rem 1.2rem;
  background: linear-gradient(125deg, rgba(255, 243, 217, 0.96), rgba(255, 211, 138, 0.9));
  color: #4d3c26;
  font-weight: 800;
  transition: transform 180ms ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const CtaSecondary = styled(Link)`
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.78rem 1.2rem;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-weight: 700;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: scale(1.03);
    background: rgba(255, 255, 255, 0.24);
  }
`;

export const Reveal = styled.div`
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 580ms ease, transform 580ms ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
