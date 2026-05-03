"use client";

import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { EmotionRegistry } from "@/app/emotion-registry";
import { GlobalStyles } from "@/styles/global-styles";
import { theme } from "@/styles/theme";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <EmotionRegistry>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </EmotionRegistry>
  );
}
