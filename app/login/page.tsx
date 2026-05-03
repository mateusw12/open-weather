"use client";

import styled from "@emotion/styled";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Wrapper = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 1rem;
`;

const Card = styled.section`
  width: min(460px, 100%);
  padding: 1.4rem;
  border-radius: 26px;
  background: linear-gradient(145deg, var(--ow-card-strong), var(--ow-card));
  border: 1px solid var(--ow-border);
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 45px rgba(7, 20, 37, 0.35);

  @media (min-width: 768px) {
    padding: 1.8rem;
  }

  h1 {
    font-size: clamp(1.8rem, 6vw, 2.4rem);
    letter-spacing: -0.03em;
  }

  p {
    margin-top: 0.5rem;
    color: rgba(238, 247, 255, 0.78);
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;

  img {
    border-radius: 12px;
    border: 1px solid var(--ow-border);
  }
`;

const ProviderList = styled.div`
  margin-top: 1.4rem;
  display: grid;
  gap: 0.75rem;
`;

const AboutLink = styled(Link)`
  margin-top: 0.95rem;
  display: inline-flex;
  color: rgba(110, 198, 189, 0.95);
  font-weight: 600;
  transition: color 180ms ease-in-out;

  &:hover {
    color: #f2974c;
  }
`;

const ProviderButton = styled.button`
  width: 100%;
  border: 1px solid var(--ow-border);
  border-radius: 15px;
  background: rgba(33, 69, 125, 0.38);
  color: var(--ow-text);
  padding: 0.9rem 1rem;
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 180ms ease-in-out, background 180ms ease-in-out;

  &:hover {
    transform: scale(1.02);
    background: rgba(38, 125, 170, 0.44);
  }
`;

export default function LoginPage() {
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
