"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { signIn } from "next-auth/react";
import {
  AboutLink,
  Brand,
  Card,
  ProviderButton,
  ProviderList,
  Wrapper,
} from "@/components/login-view/styled";

export function LoginView() {
  return (
    <Wrapper>
      <Card>
        <Brand>
          <Image src="/logo/logo.png" alt="Open Weather logo" width={56} height={56} priority />
          <h1>Open Weather</h1>
        </Brand>
        <p>Entre com sua conta para acessar uma previsão com visual imersivo.</p>

        <ProviderList>
          <ProviderButton
            type="button"
            onClick={() => void signIn("google", { callbackUrl: "/" })}
          >
            Continuar com Google
          </ProviderButton>

          <ProviderButton
            type="button"
            onClick={() => void signIn("github", { callbackUrl: "/" })}
          >
            <GitHubLogoIcon width={18} height={18} />
            Continuar com GitHub
          </ProviderButton>
        </ProviderList>

        <AboutLink href="/about">Conhecer a aplicação</AboutLink>
      </Card>
    </Wrapper>
  );
}
