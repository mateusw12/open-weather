import styled from "@emotion/styled";

export const AlertsShell = styled.main`
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
  background: linear-gradient(145deg, rgba(255, 193, 133, 0.2), rgba(133, 186, 255, 0.22));

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

export const List = styled.section`
  display: grid;
  gap: 0.8rem;
`;

export const AlertCard = styled.article<{ $level: "info" | "warning" | "danger" }>`
  border-radius: 22px;
  border: 1px solid
    ${({ $level }) =>
      $level === "danger"
        ? "rgba(255, 160, 146, 0.65)"
        : $level === "warning"
          ? "rgba(255, 212, 145, 0.6)"
          : "rgba(188, 225, 255, 0.5)"};
  background:
    ${({ $level }) =>
      $level === "danger"
        ? "linear-gradient(145deg, rgba(255, 139, 120, 0.18), rgba(255, 184, 165, 0.1))"
        : $level === "warning"
          ? "linear-gradient(145deg, rgba(255, 196, 118, 0.18), rgba(255, 223, 153, 0.1))"
          : "linear-gradient(145deg, rgba(156, 205, 255, 0.2), rgba(199, 229, 255, 0.1))"};
  backdrop-filter: blur(10px);
  padding: 1rem;

  h2 {
    font-size: 1.02rem;
    margin-bottom: 0.42rem;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.46;
  }

  small {
    display: inline-block;
    margin-top: 0.55rem;
    color: rgba(255, 255, 255, 0.82);
    font-weight: 700;
  }
`;
