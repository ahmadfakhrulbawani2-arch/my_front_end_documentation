# Server Side Rendering Light and Dark Mode without Flashing

## Prerequisites

So there's many concepts of rendering in NextJS. Me personally only understand Client Side Render (CSR) and Server Side Render (SSR), I don't understand SG and ISR, I'm still learning all of them. But when it comes to rendering, I heavily use SSR and always render all `page.tsx` with SSR even if it need CSR interactivity, I will create new file to handle it. So make sure you at least know and understand the basic behind it.

Demo video: [youtube](https://youtu.be/Uw5a5GbK8-c)

## Problem & Description

1. You need CSR components like navbar to handle theme toggle interactivity. But you need to know `does the client use light or dark mode?`
2. To know what theme the browser/client is, you use `window.matchMedia('(prefers-color-scheme: dark)');` if true => setTheme('dark') if not setTheme('').
3. Yes number 2 is work, but it create flashing like this:
4. To encounter this use SSR by directly set `class="dark"` to `<html></html>` then suppress hydration warning to avoid hydration issue due to className mismatch.

## My Approach

So this is quick way I use to create light and dark mode.

1. Install Next Theme Provider or just do `pnpm install` if you use my template [here](../playground/ssr-no-flashing-light-dark-mode/)

```bash
pnpm add next-theme-provider
```

2. Setup cookie key variable, or you can use `THEME_KEY` from next-theme-provider

```ts
// ./src/constants/Variable.ts

// cookie store variables
export const MY_COOKIE_THEME_KEY = "theme";
```

3. Setup the provider in `layout.tsx`

```tsx
import { cookies } from "next/headers";
import { MY_COOKIE_THEME_KEY } from "@/constants/Variables";
import { THEME, ThemeProvider } from "next-theme-provider";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // check cookie
  const cookieStore = await cookies();
  // get theme cookie value
  const themeCookie = cookieStore.get(MY_COOKIE_THEME_KEY)?.value;

  // set initial theme by matching the cookie value
  const initTheme =
    themeCookie === THEME.DARK ||
    themeCookie === THEME.LIGHT ||
    themeCookie === THEME.SYSTEM
      ? themeCookie
      : THEME.SYSTEM;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // suppress hydration mismatch warning
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* set initialTheme with initTheme */}
        <ThemeProvider initialTheme={initTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

4. Now create the button and the toggle function. Somehow for me, the next-theme-provider function doesn't work properly, so i store my own cookie like this:

```ts
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
```

Then I can toggle it like this:

```tsx
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
```

> [!IMPORTANT]
> Create your own loading page if you rendering a page that's fully CSR or need page conditional rendering like this:

```tsx
if (!mounted) {
  return <LoadingPage />;
}
```

5. Then configure the theme, it should follow this heavy rule to make sure all className is covered up:

```css
/* for light mode */
:root {
  /* ... */
}

/* for dark mode */
:root[data-theme="dark"],
.dark {
  /* ... */
}

/* for system mode, fallback to dark mode, but don't worry most of browser actually just use light and dark mode because prefers-color-scheme */
:root[data-theme="system"] {
  /* ... */
}
```

I already create the template for you guys [here](../playground/ssr-no-flashing-light-dark-mode/) just ensure to `pnpm install` then `pnpm dev` to open it.

---

Thank you made with 💖 By Ahmad Fakhrul Bawani
