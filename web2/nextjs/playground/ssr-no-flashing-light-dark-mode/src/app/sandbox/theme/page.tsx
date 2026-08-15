"use client"; // hanya untuk sandbox aku CSR langsung saja
import { MainLayout } from "@/components/MainLayout";
import { cn } from "@/utils/cn";
import { THEME, useThemeContext } from "next-theme-provider";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const { theme, setTheme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  const cond2 =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === THEME.DARK || (theme === THEME.SYSTEM && cond2);

  useEffect(() => {
    setMounted(true);
  }, []);

  // buat tema
  const toggleTheme = () => {
    const newIsDark = !isDark;
    const nextTheme = newIsDark ? "dark" : "light";
    setTheme(nextTheme);
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
    const root = document.documentElement;
    if (newIsDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-12 bg-background p-12">
        <h1>Try theme toggle</h1>
        <div className="absolute left-20 top-22 z-50">
          {!mounted ? (
            <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          ) : (
            <button
              type="button"
              onClick={() => toggleTheme()}
              aria-label="Toggle Theme"
              className={cn(
                "relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring ring-slate-200 dark:ring-slate-800",
                isDark ? "bg-indigo-600" : "bg-slate-300",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  isDark ? "translate-x-6" : "translate-x-0",
                )}
              >
                {!isDark ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-amber-500"
                    aria-label="moon"
                  >
                    <title>Moon</title>
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.16 5.1a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 1 1-1.06 1.06L6.16 6.16a.75.75 0 0 1 0-1.06Zm10.62 0a.75.75 0 0 1 0 1.06l-1.59 1.59a.75.75 0 1 1-1.06-1.06l1.59-1.59a.75.75 0 0 1 1.06 0ZM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM3 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm15 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25A.75.75 0 0 1 18 12Zm-11.84 5.74a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 1 1-1.06 1.06l-1.59-1.59a.75.75 0 0 1 0-1.06Zm9.68 0a.75.75 0 0 1 0 1.06l-1.59 1.59a.75.75 0 1 1-1.06-1.06l1.59-1.59a.75.75 0 0 1 1.06 0ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-indigo-600"
                    aria-label="sun"
                  >
                    <title>Sun</title>
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          )}
        </div>
        <h1>Check globals.css for theme config</h1>
        <h1>Examined the change in your browser localstorage and cookie</h1>
        <Link
          href="/"
          className="text-xs font-medium text-muted-foreground hover:text-emerald-500 transition-colors duration-200 inline-flex items-center gap-1.5 group pb-12"
          // style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>{" "}
          Ke homepage / To homepage
        </Link>
      </div>
    </MainLayout>
  );
}
