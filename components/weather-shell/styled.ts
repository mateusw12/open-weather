import styled from "@emotion/styled";

export const Shell = styled.main<{ $atmosphere: string }>`
  position: relative;
  width: min(1180px, 100%);
  margin: 0 auto;
  min-height: calc(100dvh - 60px);
  padding: 1rem 1rem 2rem;
  display: grid;
  gap: 1rem;
  align-content: start;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 34px;
    background: ${({ $atmosphere }) => $atmosphere};
    transition: background 520ms ease-in-out;
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: 1.6rem;
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

export const Hero = styled.section`
  grid-column: 1 / -1;
  border-radius: 30px;
  padding: 1.25rem;
  backdrop-filter: blur(18px);
  background: linear-gradient(135deg, rgba(38, 125, 170, 0.44), rgba(33, 69, 125, 0.38));
  border: 1px solid var(--ow-border);
  box-shadow: 0 12px 45px rgba(7, 20, 37, 0.35);
  animation: enter 420ms ease both;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  h1 {
    font-size: clamp(2.7rem, 7vw, 5.3rem);
    line-height: 0.9;
    letter-spacing: -0.045em;
    font-weight: 700;
  }

  p {
    margin-top: 0.5rem;
    color: rgba(238, 247, 255, 0.88);
  }

  @keyframes enter {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SearchRow = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.65rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr auto auto;
    align-items: center;
  }
`;

export const SearchWrap = styled.form`
  position: relative;
`;

export const SearchField = styled.input`
  width: 100%;
  border: 1px solid var(--ow-border);
  border-radius: 15px;
  background: rgba(33, 69, 125, 0.42);
  color: var(--ow-text);
  padding: 0.85rem 2.5rem 0.85rem 0.9rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 180ms ease-in-out;

  &:focus {
    border-color: rgba(242, 151, 76, 0.72);
  }

  &::placeholder {
    color: rgba(234, 244, 255, 0.6);
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: rgba(110, 198, 189, 0.95);
  cursor: pointer;
`;

export const ActionButton = styled.button`
  border: 1px solid var(--ow-border);
  background: rgba(33, 69, 125, 0.44);
  color: var(--ow-text);
  border-radius: 14px;
  padding: 0.8rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 180ms ease-in-out, background 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
    background: rgba(38, 125, 170, 0.58);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

export const SuggestionList = styled.ul`
  margin-top: 0.45rem;
  display: grid;
  gap: 0.3rem;
`;

export const SuggestionButton = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid var(--ow-border);
  border-radius: 12px;
  background: rgba(33, 69, 125, 0.36);
  color: var(--ow-text);
  padding: 0.6rem 0.75rem;
  cursor: pointer;

  &:hover {
    background: rgba(38, 125, 170, 0.52);
  }
`;

export const Stats = styled.section`
  border-radius: 24px;
  padding: 1.2rem;
  backdrop-filter: blur(14px);
  background: rgba(33, 69, 125, 0.42);
  border: 1px solid var(--ow-border);
  display: grid;
  gap: 0.7rem;
  animation: enter 440ms ease both;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(110, 198, 189, 0.92);
  }
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: rgba(238, 247, 255, 0.84);
  }

  strong {
    font-size: 1.08rem;
  }
`;

export const Hourly = styled.section`
  grid-column: 1 / -1;
  border-radius: 24px;
  padding: 1rem;
  backdrop-filter: blur(14px);
  background: rgba(33, 69, 125, 0.38);
  border: 1px solid var(--ow-border);
  animation: enter 460ms ease both;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(110, 198, 189, 0.9);
    margin-bottom: 0.8rem;
  }
`;

export const HourlyScroll = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(92px, 1fr);
  gap: 0.7rem;
  overflow-x: auto;
  padding-bottom: 0.3rem;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(110, 198, 189, 0.48);
    border-radius: 999px;
  }
`;

export const HourlyItem = styled.article`
  padding: 0.85rem;
  border-radius: 16px;
  background: rgba(33, 69, 125, 0.34);
  border: 1px solid var(--ow-border);
  scroll-snap-align: start;
  transition: transform 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  p {
    font-size: 0.85rem;
    color: rgba(238, 247, 255, 0.76);
  }

  strong {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.05rem;
  }
`;

export const Daily = styled.section`
  border-radius: 24px;
  padding: 1rem;
  backdrop-filter: blur(14px);
  background: rgba(33, 69, 125, 0.38);
  border: 1px solid var(--ow-border);
  display: grid;
  gap: 0.5rem;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(110, 198, 189, 0.9);
    margin-bottom: 0.2rem;
  }
`;

export const DailyRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.8rem;
  align-items: center;
  border-radius: 12px;
  padding: 0.5rem 0.7rem;
  background: rgba(38, 125, 170, 0.46);
`;

export const ErrorMessage = styled.p`
  margin-top: 0.7rem;
  color: #ffd4b3;
`;

export const SkeletonCard = styled.div`
  border-radius: 24px;
  min-height: 130px;
  border: 1px solid var(--ow-border);
  background:
    linear-gradient(
      100deg,
      rgba(33, 69, 125, 0.42) 22%,
      rgba(71, 175, 197, 0.52) 42%,
      rgba(38, 125, 170, 0.36) 62%
    );
  background-size: 220% 100%;
  animation: shimmer 1.2s linear infinite;

  @keyframes shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: -100% 0;
    }
  }
`;
