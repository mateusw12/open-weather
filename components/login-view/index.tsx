"use client";

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
import { PiGithubLogo, PiGoogleLogo } from "react-icons/pi";

export function LoginView() {
  return (
    <Wrapper>
      <Card>
        <Brand>
          <Image
            src="/logo/logo.png"
            alt="Open Weather logo"
            width={74}
            height={74}
            priority
          />
          <h1>Open Weather</h1>
        </Brand>
        <p>
          Entre com sua conta para acessar uma previsão com visual imersivo.
        </p>

        <ProviderList>
          <ProviderButton
            type="button"
            onClick={() => void signIn("google", { callbackUrl: "/" })}
          >
            <PiGoogleLogo />
            Continuar com Google
          </ProviderButton>

          <ProviderButton
            type="button"
            onClick={() => void signIn("github", { callbackUrl: "/" })}
          >
            <PiGithubLogo />
            Continuar com GitHub
          </ProviderButton>
        </ProviderList>

        <AboutLink href="/about">Conhecer a aplicação</AboutLink>
      </Card>
    </Wrapper>
  );
}
