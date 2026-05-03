"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/sign-out-button/styled";

export function SignOutButton() {
  return (
    <Button type="button" onClick={() => void signOut({ callbackUrl: "/login" })}>
      Sair
    </Button>
  );
}
