import styled from "@emotion/styled";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "@/auth";

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
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 45px rgba(7, 20, 37, 0.35);

  h1 {
    font-size: clamp(1.8rem, 6vw, 2.4rem);
    letter-spacing: -0.03em;
  }

  p {
    margin-top: 0.5rem;
    color: rgba(234, 244, 255, 0.75);
  }
`;

const ProviderList = styled.div`
  margin-top: 1.4rem;
  display: grid;
  gap: 0.75rem;
`;

const ProviderButton = styled.button`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  color: #eaf4ff;
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
    background: rgba(255, 255, 255, 0.18);
  }
`;

export default function LoginPage() {
  async function signInWithGoogle() {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }

  async function signInWithGithub() {
    "use server";
    await signIn("github", { redirectTo: "/" });
  }

  return (
    <Wrapper>
      <Card>
        <h1>Open Weather</h1>
        <p>Entre com sua conta para acessar uma previsão com visual imersivo.</p>

        <ProviderList>
          <form action={signInWithGoogle}>
            <ProviderButton type="submit">Continuar com Google</ProviderButton>
          </form>

          <form action={signInWithGithub}>
            <ProviderButton type="submit">
              <GitHubLogoIcon width={18} height={18} />
              Continuar com GitHub
            </ProviderButton>
          </form>
        </ProviderList>
      </Card>
    </Wrapper>
  );
}
