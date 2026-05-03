import styled from "@emotion/styled";

export const Button = styled.button`
  border: 1px solid var(--ow-border);
  background: rgba(33, 69, 125, 0.42);
  color: var(--ow-text);
  border-radius: 12px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  transition: transform 180ms ease-in-out, background 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
    background: rgba(242, 151, 76, 0.3);
  }
`;
