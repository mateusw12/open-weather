import styled from "@emotion/styled";

export const TodayShell = styled.main`
  width: min(1160px, 100%);
  margin: 0 auto;
  min-height: 100dvh;
  padding: 1rem 1rem 2.2rem;
  display: grid;
  gap: 1rem;
`;

export const Hero = styled.section<{ $tone: string; $borderTone: string }>`
  border-radius: 30px;
  padding: 1.2rem;
  border: 1px solid ${({ $borderTone }) => $borderTone};
  background: ${({ $tone }) => $tone};
  backdrop-filter: blur(12px);

  h1 {
    font-size: clamp(1.7rem, 5vw, 2.7rem);
    letter-spacing: -0.03em;
  }

  p {
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const HeroIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.18);
  margin-bottom: 0.5rem;
`;

export const Grid = styled.section`
  display: grid;
  gap: 0.85rem;

  @media (min-width: 800px) {
    grid-template-columns: 1.1fr 1fr;
  }
`;

export const Card = styled.article<{ $tone: string; $borderTone: string }>`
  border-radius: 24px;
  border: 1px solid ${({ $borderTone }) => $borderTone};
  padding: 1rem;
  background: ${({ $tone }) => $tone};
  backdrop-filter: blur(10px);

  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255, 245, 223, 0.96);
    margin-bottom: 0.65rem;
  }
`;

export const StatList = styled.div`
  display: grid;
  gap: 0.55rem;
`;

export const StatRow = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  padding: 0.55rem 0.65rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);

  strong {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

export const HourlyStrip = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(105px, 1fr);
  gap: 0.65rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.2rem;
`;

export const HourlyItem = styled.div<{ $tone: string; $borderTone: string }>`
  border-radius: 16px;
  border: 1px solid ${({ $borderTone }) => $borderTone};
  background: ${({ $tone }) => $tone};
  padding: 0.7rem;
  scroll-snap-align: start;

  p {
    color: rgba(255, 255, 255, 0.88);
    font-size: 0.86rem;
  }

  strong {
    display: block;
    margin-top: 0.25rem;
    font-size: 1.06rem;
  }
`;

export const HourIcon = styled.div`
  margin-bottom: 0.2rem;
`;

export const LoadingCard = styled.div`
  border-radius: 24px;
  min-height: 170px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  background: linear-gradient(
    110deg,
    rgba(255, 255, 255, 0.2) 25%,
    rgba(255, 224, 173, 0.34) 45%,
    rgba(187, 218, 255, 0.22) 65%
  );
  background-size: 220% 100%;
  animation: shimmer 1.1s linear infinite;

  @keyframes shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: -100% 0;
    }
  }
`;

export const ErrorText = styled.p`
  border-radius: 18px;
  border: 1px solid rgba(255, 187, 168, 0.6);
  background: rgba(255, 169, 142, 0.18);
  padding: 0.85rem 1rem;
  color: #fff3e6;
  font-weight: 600;
`;
