import styled from "@emotion/styled";

export const InsightsShell = styled.main`
  width: min(1100px, 100%);
  margin: 0 auto;
  min-height: 100dvh;
  padding: 1rem 1rem 2.4rem;
  display: grid;
  gap: 1rem;
`;

export const Hero = styled.section`
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.33);
  padding: 1.2rem;
  backdrop-filter: blur(12px);
  background:
    radial-gradient(circle at 16% 18%, rgba(255, 225, 148, 0.22), transparent 32%),
    radial-gradient(circle at 85% 20%, rgba(147, 214, 255, 0.26), transparent 34%),
    linear-gradient(145deg, rgba(141, 192, 255, 0.24), rgba(186, 230, 255, 0.16));
  display: grid;
  gap: 0.9rem;
`;

export const HeroHeader = styled.div`
  h1 {
    margin-top: 0.45rem;
    font-size: clamp(1.62rem, 4vw, 2.45rem);
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  p {
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.92);
    max-width: 60ch;
    line-height: 1.45;
  }
`;

export const HeroBadge = styled.span`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.18);
  padding: 0.34rem 0.64rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.94);
`;

export const HeroMetrics = styled.div`
  display: grid;
  gap: 0.6rem;

  @media (min-width: 680px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const HeroMetric = styled.article`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.16);
  padding: 0.56rem 0.65rem;
  display: grid;
  gap: 0.26rem;

  small {
    color: rgba(255, 255, 255, 0.84);
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    font-size: 0.78rem;
  }

  strong {
    color: rgba(255, 255, 255, 0.98);
    font-size: 0.97rem;
    letter-spacing: -0.01em;
  }
`;

export const SearchRow = styled.form`
  display: grid;
  gap: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr auto;
  }
`;

export const SearchInput = styled.input`
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  padding: 0.72rem 0.78rem;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.74);
  }
`;

export const SearchButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.72rem 0.95rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.75;
  }
`;

export const StatusText = styled.p`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.16);
  padding: 0.7rem 0.85rem;
  color: rgba(255, 255, 255, 0.92);
`;

export const Grid = styled.section`
  display: grid;
  gap: 0.8rem;

  @media (min-width: 780px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SectionTitle = styled.h2`
  margin-top: 0.25rem;
  margin-bottom: -0.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: clamp(1.08rem, 2.4vw, 1.34rem);
  color: rgba(255, 248, 229, 0.98);
  letter-spacing: -0.02em;
`;

export const SnapshotGrid = styled.section`
  display: grid;
  gap: 0.75rem;

  @media (min-width: 820px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const SnapshotCard = styled.article`
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(186, 220, 255, 0.12));
  backdrop-filter: blur(8px);
  padding: 0.9rem;

  small {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: rgba(255, 255, 255, 0.86);
    font-size: 0.81rem;
  }

  strong {
    display: block;
    margin-top: 0.3rem;
    font-size: 1.04rem;
    color: rgba(255, 255, 255, 0.98);
    letter-spacing: -0.015em;
  }

  p {
    margin-top: 0.42rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.42;
  }
`;

export const ForecastStrip = styled.section`
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(186, 220, 255, 0.1));
  backdrop-filter: blur(8px);
  padding: 0.75rem;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(74px, 1fr);
  gap: 0.55rem;
  overflow-x: auto;
`;

export const ForecastItem = styled.article`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.14);
  padding: 0.65rem 0.45rem;
  text-align: center;

  small {
    display: block;
    color: rgba(255, 255, 255, 0.84);
    font-size: 0.75rem;
  }

  strong {
    display: block;
    margin-top: 0.2rem;
    font-size: 1.28rem;
  }

  p {
    margin-top: 0.18rem;
    color: rgba(255, 255, 255, 0.94);
    font-size: 0.87rem;
    font-weight: 700;
  }
`;

export const InsightCard = styled.article`
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(186, 220, 255, 0.14));
  backdrop-filter: blur(10px);
  padding: 1rem;

  h2 {
    margin-top: 0.35rem;
    font-size: 1.04rem;
  }

  p {
    margin-top: 0.45rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.45;
  }
`;
