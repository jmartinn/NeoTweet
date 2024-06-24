'use client';

import { useState } from 'react';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { Theme } from '@/app/types';

interface Props {
  theme: Theme;
}

export default function ThemeToggle({ theme }: Props) {
  const [_theme, setTheme] = useState<Theme>(theme);

  const toggleTheme = () => {
    const root = document.getElementsByTagName('html')[0];
    root.classList.toggle(Theme.dark);
    if (root.classList.contains(Theme.dark)) {
      setTheme(Theme.dark);
      document.cookie = `theme=${Theme.dark};SameSite=Lax`;
    } else {
      setTheme(Theme.light);
      document.cookie = `theme=${Theme.light};SameSite=Lax`;
    }
  };

  return (
    <>
      <button onClick={toggleTheme}>
        {_theme === Theme.light ? (
          <div className="cursor-pointer rounded-full p-2 shadow-lg shadow-zinc-800/10 ring-1 ring-zinc-900/10 backdrop-blur hover:bg-zinc-50 dark:ring-white/10 dark:hover:bg-zinc-800/90">
            <SunIcon className="size-6 stroke-teal-400" />
          </div>
        ) : (
          <div className="cursor-pointer rounded-full p-2 shadow-lg shadow-zinc-800/10 ring-1 ring-zinc-900/10 backdrop-blur hover:bg-zinc-50 dark:ring-white/10 dark:hover:bg-zinc-800/90">
            <MoonIcon className="size-6 stroke-purple-500" />
          </div>
        )}
      </button>
    </>
  );
}
