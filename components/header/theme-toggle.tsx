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
        <div className="group cursor-pointer rounded-full p-2 shadow-xl shadow-zinc-800/10 ring-2 ring-zinc-900/10 backdrop-blur transition-all hover:bg-zinc-50 hover:shadow-teal-500/20">
          <Icons.Sun className="size-6 stroke-teal-400 transition-transform duration-300 group-hover:translate-y-[-0.1875rem] group-hover:stroke-teal-500" />
        </div>
      ) : (
        <div className="group cursor-pointer rounded-full p-2 ring-2 backdrop-blur transition-all dark:shadow-xl dark:shadow-zinc-500/10 dark:ring-white/10 dark:hover:bg-zinc-800/90 dark:hover:shadow-purple-700/20">
          <Icons.Moon className="size-6 stroke-purple-500 transition-transform duration-300 group-hover:translate-y-[-0.1875rem] group-hover:stroke-purple-700" />
        </div>
      )}
    </button>
  );
}
