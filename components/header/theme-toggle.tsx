'use client';

import { useState } from 'react';

import { Theme } from '@/app/types';
import { Icons } from '@/components/icons';

interface ThemeToggleProps {
  theme: Theme;
}

export default function ThemeToggle({ theme }: ThemeToggleProps) {
  const [_theme, setTheme] = useState<Theme>(theme);

  const toggleTheme = () => {
    const root = document.getElementsByTagName('html')[0];
    root.classList.toggle(Theme.Dark);
    if (root.classList.contains(Theme.Dark)) {
      setTheme(Theme.Dark);
      document.cookie = `theme=${Theme.Dark};SameSite=Lax`;
    } else {
      setTheme(Theme.Light);
      document.cookie = `theme=${Theme.Light};SameSite=Lax`;
    }
  };

  return (
    <button type="button" onClick={toggleTheme}>
      {_theme === Theme.Light ? (
        <div className="cursor-pointer rounded-full p-2 shadow-lg shadow-zinc-800/10 ring-2 ring-zinc-900/10 backdrop-blur hover:bg-zinc-50 dark:shadow-lg dark:shadow-zinc-500/10 dark:ring-white/10 dark:hover:bg-zinc-800/90">
          <Icons.Sun className="size-6 stroke-teal-400" />
        </div>
      ) : (
        <div className="cursor-pointer rounded-full p-2 shadow-lg shadow-zinc-800/10 ring-2 ring-zinc-900/10 backdrop-blur hover:bg-zinc-50 dark:shadow-lg dark:shadow-zinc-500/10 dark:ring-white/10 dark:hover:bg-zinc-800/90">
          <Icons.Moon className="size-6 stroke-purple-500" />
        </div>
      )}
    </button>
  );
}
