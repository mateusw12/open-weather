"use client";

import { Global, css } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          color-scheme: dark;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          min-height: 100%;
          width: 100%;
        }

        body {
          font-family: var(--font-sora), sans-serif;
          background:
            radial-gradient(circle at 12% 24%, rgba(64, 181, 252, 0.45), transparent 40%),
            radial-gradient(circle at 80% 14%, rgba(252, 211, 77, 0.38), transparent 46%),
            radial-gradient(circle at 50% 80%, rgba(20, 39, 66, 0.78), transparent 55%),
            linear-gradient(165deg, #0f2038 0%, #102744 34%, #0b1628 100%);
          color: #eaf4ff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
  );
}
