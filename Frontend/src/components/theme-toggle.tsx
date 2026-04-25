'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="relative h-9 w-9 rounded-xl border border-border-subtle bg-background-secondary flex items-center justify-center" aria-label="Toggle theme">
        <span className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative h-9 w-9 rounded-xl border border-border-subtle bg-background-secondary hover:bg-brand/10 flex items-center justify-center transition-all duration-200 group"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 text-content-main/70 group-hover:text-brand rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="h-4 w-4 text-content-main/70 group-hover:text-brand rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100 absolute" />
    </button>
  );
}


export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}