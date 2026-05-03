import styled from "@emotion/styled";

export const InsightsShell = styled.main`
  width: min(1100px, 100%);
  margin: 0 auto;
  min-height: 100dvh;
  padding: 1rem 1rem 2.2rem;
  display: grid;
  gap: 1rem;
`;

export const Hero = styled.section`
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.33);
  padding: 1.2rem;
  backdrop-filter: blur(12px);
  background: linear-gradient(145deg, rgba(141, 192, 255, 0.22), rgba(186, 230, 255, 0.16));

  h1 {
    font-size: clamp(1.6rem, 4vw, 2.35rem);
    letter-spacing: -0.03em;
  }

  p {
    margin-top: 0.45rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const SearchRow = styled.form`
  margin-top: 0.75rem;
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
