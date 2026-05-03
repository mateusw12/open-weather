"use client";

import styled from "@emotion/styled";
import { signOut } from "next-auth/react";

const Button = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.1);
  color: #eaf4ff;
  border-radius: 12px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  transition: transform 180ms ease-in-out, background 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.16);
  }
`;

export function SignOutButton() {
  return (
    <Button type="button" onClick={() => void signOut({ callbackUrl: "/login" })}>
      Sair
    </Button>
  );
}
