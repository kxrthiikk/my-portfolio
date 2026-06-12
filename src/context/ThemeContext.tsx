import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "operations" | "archive";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "archive") {
    root.classList.add("dark");
    root.style.setProperty("color-scheme", "dark");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#1c1c1e");
  } else {
    root.classList.remove("dark");
    root.style.setProperty("color-scheme", "light");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#FAFAF8");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "operations";
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "archive" || stored === "operations") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "archive"
      : "operations";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === "operations" ? "archive" : "operations";

    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }

    document.startViewTransition(() => {
      setTheme(next);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === "archive", toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
