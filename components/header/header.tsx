import { cookies } from 'next/headers';
import Link from 'next/link';

import { Theme } from '@/app/types';
import { Icons } from '@/components/icons';

import Login from './login';
import NavBar from './nav-bar';
import ThemeToggle from './theme-toggle';

export default function Header() {
  const theme =
    cookies().get('theme')?.value === 'dark' ? Theme.Dark : Theme.Light;
  return (
    <header className="mx-auto mb-32 mt-10 w-full max-w-7xl">
      <div className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <div className="relative flex items-center gap-4">
            <div className="flex flex-1">
              <span className="group flex text-3xl text-zinc-500 dark:text-zinc-200">
                <Icons.Logo className="my-auto size-10" />
                <Link
                  className="relative block px-3 py-2 font-medium transition-colors duration-300 hover:text-teal-500 dark:hover:text-teal-400"
                  href="/"
                >
                  NeoTweet
                </Link>
              </span>{' '}
            </div>
            <NavBar />
            <div className="flex items-center justify-end gap-x-4 md:flex-1">
              {/* Search */}
              <div className="cursor-pointer rounded-full p-2 shadow-lg shadow-zinc-800/5 ring-2 ring-zinc-900/10 backdrop-blur hover:bg-zinc-50 dark:shadow-zinc-500/10 dark:ring-white/10 dark:hover:bg-zinc-800/90">
                <Icons.Magnifier className="size-6 stroke-zinc-500 dark:stroke-zinc-500" />
              </div>
              <ThemeToggle theme={theme} />
              <Login>
                <div className="ml-6 flex flex-1 justify-end">
                  <Link
                    href="/login"
                    className="group flex items-center space-x-1 rounded-full px-4 py-2 text-sm font-semibold leading-6 text-purple-500 shadow-lg shadow-zinc-800/10 ring-2 ring-zinc-900/10 backdrop-blur transition-all duration-300 hover:text-purple-700 hover:shadow-purple-500/20 dark:text-teal-400 dark:shadow-lg dark:shadow-zinc-500/10 dark:ring-white/10 dark:hover:text-teal-500 dark:hover:shadow-teal-500/10"
                  >
                    <span>Log in</span>
                    <span
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <Icons.ArrowRight className="size-4" />
                    </span>
                  </Link>
                </div>
              </Login>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
