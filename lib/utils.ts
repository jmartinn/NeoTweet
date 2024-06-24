import * as crypto from 'crypto';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function shortenHash(hash: string, length = 4): string | undefined {
  if (hash) {
    return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
  }
}

export function getTagValues(name: string, tags: string[][]): string {
  const [itemTag] = tags.filter((tag: string[]) => tag[0] === name);
  const [, item] = itemTag || [, undefined];

  return item;
}

export function uniqBy<T>(arr: T[], key: keyof T): T[] {
  return Object.values(
    arr.reduce<Record<string, T>>((map, item) => {
      const value = String(item[key]);
      map[value] = item;
      return map;
    }, {}),
  );
}

function generateUniqueHash(data: string, length: number): string {
  const sha256 = crypto.createHash('sha256');
  sha256.update(data);
  return sha256.digest('hex').substring(0, length);
}

function createUrlSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

export function createUniqueUrl(title: string): string {
  const titleSlug = createUrlSlug(title);
  const uniqueHash = generateUniqueHash(title + Date.now().toString(), 12);
  return `${titleSlug}-${uniqueHash}`;
}
