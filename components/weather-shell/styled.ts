import styled from "@emotion/styled";

export const Shell = styled.main<{ $atmosphere: string }>`
  position: relative;
  width: min(1220px, 100%);
  margin: 0 auto;
  min-height: calc(100dvh - 72px);
  padding: 0.8rem 1rem 2.2rem;
  display: grid;
  gap: 1.05rem;
  align-content: start;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 42px;
    background: ${({ $atmosphere }) => $atmosphere};
    transition: background 520ms ease-in-out, transform 620ms ease-in-out;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 12px;
    border-radius: 34px;
    background:
      radial-gradient(circle at 16% 12%, rgba(255, 255, 255, 0.35), transparent 22%),
      radial-gradient(circle at 84% 88%, rgba(255, 198, 136, 0.2), transparent 26%);
    pointer-events: none;
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: 1.25rem 1.35rem 2.2rem;
    grid-template-columns: 1.24fr 0.76fr;
  }
`;

export const Hero = styled.section`
  grid-column: 1 / -1;
  border-radius: 34px;
  padding: 1.35rem;
  backdrop-filter: blur(16px);
  background:
    radial-gradient(circle at 82% 18%, rgba(255, 226, 176, 0.3), transparent 32%),
    linear-gradient(135deg, rgba(133, 186, 255, 0.22), rgba(255, 208, 151, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.38);
  box-shadow: 0 18px 55px rgba(10, 18, 44, 0.28);
  animation: enter 480ms ease both;

  @media (min-width: 768px) {
    padding: 2.2rem;
  }

  h1 {
    margin-top: 0.25rem;
    font-size: clamp(3.2rem, 10vw, 6.7rem);
    line-height: 0.9;
    letter-spacing: -0.045em;
    font-weight: 800;
    color: #ffffff;
    text-shadow: 0 10px 28px rgba(11, 20, 38, 0.2);
  }

  p {
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.92);
    max-width: 42ch;
  }

  p:first-of-type {
    margin-top: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.98rem;
    font-weight: 700;
    color: rgba(250, 253, 255, 0.92);
    letter-spacing: 0.01em;
  }

  p:last-of-type {
    color: rgba(245, 249, 255, 0.86);
    font-size: 0.92rem;
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

export const HeroChipGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.55rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const HeroChip = styled.article`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.14);
  padding: 0.62rem 0.7rem;
  backdrop-filter: blur(6px);

  span {
    font-size: 0.77rem;
    color: rgba(255, 251, 242, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  strong {
    display: block;
    margin-top: 0.24rem;
    font-size: 1.02rem;
  }
`;

export const SearchRow = styled.div`
  margin-top: 1.2rem;
  display: grid;
  gap: 0.72rem;

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
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.95rem 2.65rem 0.95rem 0.95rem;
  font-size: 0.98rem;
  outline: none;
  transition: border-color 180ms ease-in-out, transform 180ms ease-in-out;

  &:focus {
    border-color: rgba(255, 232, 196, 0.9);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.78);
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.95);
  cursor: pointer;
`;

export const ActionButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.36);
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.2), rgba(150, 187, 255, 0.2));
  color: #ffffff;
  border-radius: 18px;
  padding: 0.86rem 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 180ms ease-in-out, background 180ms ease-in-out;

  &:hover {
    transform: scale(1.02) translateY(-1px);
    background: linear-gradient(130deg, rgba(255, 214, 144, 0.3), rgba(170, 201, 255, 0.34));
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

export const SuggestionList = styled.ul`
  margin-top: 0.55rem;
  display: grid;
  gap: 0.3rem;
`;

export const SuggestionButton = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
`;

export const Stats = styled.section`
  border-radius: 28px;
  padding: 1.25rem;
  backdrop-filter: blur(12px);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(255, 243, 221, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.32);
  display: grid;
  gap: 0.75rem;
  animation: enter 440ms ease both;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(255, 245, 223, 0.96);
  }
`;

export const TodayHighlight = styled.section`
  border-radius: 28px;
  padding: 1.05rem;
  backdrop-filter: blur(12px);
  background: linear-gradient(145deg, rgba(255, 228, 176, 0.22), rgba(180, 209, 255, 0.14));
  border: 1px solid rgba(255, 255, 255, 0.34);
  display: grid;
  gap: 0.62rem;
  animation: enter 430ms ease both;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(255, 245, 223, 0.96);
  }
`;

export const SunCycleCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.14);
  padding: 0.65rem;
`;

export const SunCycleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.83rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    color: rgba(255, 255, 255, 0.94);
  }
`;

export const SunCycleTrack = styled.div`
  position: relative;
  margin-top: 0.6rem;
  height: 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(183, 220, 255, 0.22);
`;

export const SunCycleProgress = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 216, 138, 0.8), rgba(255, 159, 99, 0.92));
`;

export const SunMarker = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: rgba(255, 238, 198, 0.88);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ba611e;
`;

export const SunTimes = styled.div`
  margin-top: 0.55rem;
  display: flex;
  justify-content: space-between;

  small {
    color: rgba(255, 255, 255, 0.86);
    font-size: 0.76rem;
  }
`;

export const TempBarChart = styled.div`
  display: grid;
  gap: 0.45rem;
`;

export const TempBarRow = styled.div`
  display: grid;
  grid-template-columns: 54px 1fr auto;
  gap: 0.55rem;
  align-items: center;

  span {
    color: rgba(255, 255, 255, 0.88);
    font-size: 0.82rem;
  }

  strong {
    font-size: 0.92rem;
  }
`;

export const TempBarTrack = styled.div`
  width: 100%;
  height: 11px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
`;

export const TempBarFill = styled.div<{ $width: number; $tone: string }>`
  width: ${({ $width }) => `${$width}%`};
  height: 100%;
  border-radius: 999px;
  background: ${({ $tone }) => $tone};
`;

export const TodayHighlightItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  border-radius: 13px;
  padding: 0.5rem 0.62rem;
  background: rgba(255, 255, 255, 0.16);

  span {
    color: rgba(255, 255, 255, 0.9);
  }

  strong {
    font-size: 1.02rem;
  }
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: rgba(255, 255, 255, 0.9);
  }

  strong {
    font-size: 1.14rem;
  }
`;

export const Hourly = styled.section`
  grid-column: 1 / -1;
  border-radius: 30px;
  padding: 1rem;
  backdrop-filter: blur(12px);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 224, 172, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.32);
  animation: enter 460ms ease both;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(255, 245, 223, 0.96);
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
  padding: 0.9rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.34);
  scroll-snap-align: start;
  transition: transform 180ms ease-in-out;
  opacity: 0;
  transform: translateY(10px);
  animation: riseIn 420ms ease forwards;
  animation-delay: var(--delay, 0ms);

  &:hover {
    transform: scale(1.02);
  }

  @keyframes riseIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.88);
  }

  strong {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.05rem;
  }
`;

export const HourlyIcon = styled.div`
  margin-bottom: 0.2rem;
  color: rgba(255, 245, 215, 0.95);
`;

export const Daily = styled.section`
  border-radius: 28px;
  padding: 1rem;
  backdrop-filter: blur(12px);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(180, 209, 255, 0.14));
  border: 1px solid rgba(255, 255, 255, 0.33);
  display: grid;
  gap: 0.5rem;

  h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(255, 245, 223, 0.96);
    margin-bottom: 0.2rem;
  }
`;

export const DailyRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.8rem;
  align-items: center;
  border-radius: 14px;
  padding: 0.55rem 0.72rem;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.26);
  opacity: 0;
  transform: translateY(10px);
  animation: riseIn 420ms ease forwards;
  animation-delay: var(--delay, 0ms);

  @keyframes riseIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DailyIcon = styled.div`
  color: rgba(255, 243, 205, 0.96);
`;

export const ErrorMessage = styled.p`
  margin-top: 0.7rem;
  color: #fff0de;
  font-weight: 600;
`;

export const SkeletonCard = styled.div`
  border-radius: 28px;
  min-height: 130px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background:
    linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.22) 22%,
      rgba(255, 229, 191, 0.42) 42%,
      rgba(174, 206, 255, 0.3) 62%
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
