export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1200,
} as const;

export const theme = {
  colors: {
    textPrimary: "#eaf4ff",
    textSecondary: "rgba(234, 244, 255, 0.74)",
    border: "rgba(255, 255, 255, 0.2)",
    glass: "rgba(255, 255, 255, 0.12)",
    glassStrong: "rgba(255, 255, 255, 0.18)",
    accent: "#7dd3fc",
    accentAlt: "#fcd34d",
  },
  radius: {
    md: "14px",
    lg: "22px",
    xl: "30px",
  },
  shadow: {
    soft: "0 12px 45px rgba(7, 20, 37, 0.35)",
  },
  screens: breakpoints,
} as const;

export type AppTheme = typeof theme;
