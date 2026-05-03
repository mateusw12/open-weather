"use client";

import { Global, css } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          color-scheme: dark;
          --ow-blue-60: #21457d;
          --ow-blue-30: #267daa;
          --ow-azure: #47afc5;
          --ow-turquoise: #6ec6bd;
          --ow-accent-10: #f2974c;
          --ow-text: #eef7ff;
          --ow-card: rgba(33, 69, 125, 0.46);
          --ow-card-strong: rgba(38, 125, 170, 0.42);
          --ow-border: rgba(110, 198, 189, 0.33);
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
            radial-gradient(circle at 14% 22%, rgba(71, 175, 197, 0.35), transparent 42%),
            radial-gradient(circle at 82% 16%, rgba(110, 198, 189, 0.3), transparent 48%),
            radial-gradient(circle at 74% 84%, rgba(242, 151, 76, 0.16), transparent 42%),
            linear-gradient(165deg, #1b3f75 0%, #21457d 36%, #1a3762 100%);
          color: var(--ow-text);
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
