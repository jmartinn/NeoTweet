'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 justify-end md:justify-center">
      <nav className="pointer-events-auto hidden md:block">
        <ul className="bg-accent flex rounded-full px-3 text-sm font-medium text-zinc-800 shadow-xl shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:text-zinc-200 dark:ring-white/10">
          <li>
            <Link
              className={cn(
                'relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400',
                pathname === '/' && 'text-teal-500 dark:text-teal-400',
              )}
              href="/"
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                'relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400',
                pathname === '/notes' && 'text-teal-500 dark:text-teal-400',
              )}
              href="/notes"
            >
              Notes
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                'relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400',
                pathname === '/projects' && 'text-teal-500 dark:text-teal-400',
              )}
              href="/projects"
            >
              Snippets
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
