import styles from "./NavBar.module.sass";

export type Theme = "light" | "dark" | "system";

const ThemeLabel = {
  SYSTEM: "System",
  LIGHT: "Light",
  DARK: "Dark",
} as const;

export const themeIcon = (
  mounted: boolean,
  theme: Theme,
  resolvedTheme: Theme,
) =>
  !mounted
    ? systemSvg
    : theme === "system"
      ? systemSvg
      : resolvedTheme === "light"
        ? sunSvg
        : moonSvg;

export const themeLabel = (
  mounted: boolean,
  theme: Theme,
  resolvedTheme: Theme,
) =>
  !mounted
    ? ThemeLabel.SYSTEM
    : theme === "system"
      ? ThemeLabel.SYSTEM
      : resolvedTheme === "light"
        ? ThemeLabel.LIGHT
        : ThemeLabel.DARK;

export const getNavbarStyle = (scrollDirection: string): string => {
  return `${styles.nav} ${scrollDirection === "down" ? styles.hiddenNav : styles.visibleNav}`;
};

export function getNavLinkClass(isActive: boolean): string {
  return isActive ? `${styles.navLink} ${styles.current}` : styles.navLink;
}

export function nextTheme(theme: Theme): Theme {
  if (theme === "system") return "dark";
  if (theme === "dark") return "light";
  return "system";
}

const systemSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18A9 9 0 0 1 12 3z" fill="currentColor" stroke="none" />
  </svg>
);

const sunSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const moonSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
