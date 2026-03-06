import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { layoutProps } from "../types";

type Theme = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") return getSystemTheme();
  return theme;
}

export const ThemeProvider: FC<layoutProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  const applyTheme = useCallback((resolved: ResolvedTheme) => {
    document.documentElement.setAttribute("data-theme", resolved);
    setResolvedTheme(resolved);
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
      applyTheme(resolveTheme(newTheme));
    },
    [applyTheme],
  );

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored || "system";
    setThemeState(initial);
    applyTheme(resolveTheme(initial));
  }, [applyTheme]);

  // Listen for system theme changes when theme is 'system'
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(getSystemTheme());
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
