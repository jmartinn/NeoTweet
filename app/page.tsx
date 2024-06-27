'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import type { Event } from 'nostr-tools';

import { useArticleEventStore } from '@/app/stores/event-store';
import { useProfileStore } from '@/app/stores/profile-store';
import { useRelayMenuStore } from '@/app/stores/relay-menu-store';
import { useRelayStore } from '@/app/stores/relay-store';
import { Profile } from '@/app/types';
import { Article } from '@/components/article';
import { Icons } from '@/components/icons';
import { RelaySheet } from '@/components/menus/relay-menu';
import { Badge } from '@/components/ui/badge';
import { getTagValues } from '@/lib/utils';

export default function Home() {
  const { setRelayMenuIsOpen } = useRelayMenuStore();

  const {
    getEvents: getArticleEvents,
    setEvents: setArticleEvents,
    events: articleEvents,
  } = useArticleEventStore();

  const { subscribe, relayUrl } = useRelayStore();
  const { setProfile } = useProfileStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const articleFilter = {
    kinds: [30023],
    limit: 10,
    until: undefined,
    // "#t": ["neovim"],
  };

  const getArticles = async () => {
    const events: Event[] = [];
    const pubkeys = new Set();

    if (articleEvents[relayUrl]) {
      const lastEvent = articleEvents[relayUrl].slice(-1)[0];
      // @ts-expect-error: until can be both number and undefined
      articleFilter.until = lastEvent.created_at - 10;
    }

    const onEvent = (event: Event) => {
      const title = getTagValues('title', event.tags);

      if (title) {
        events.push(event);
        pubkeys.add(event.pubkey);
      }
    };

    const onEOSE = () => {
      if (articleEvents[relayUrl]) {
        setArticleEvents(relayUrl, [...articleEvents[relayUrl], ...events]);
      } else {
        setArticleEvents(relayUrl, events);
      }

      const userFilter = {
        kinds: [0],
        authors: Array.from(pubkeys),
      };

      const onEvent = (event: Event) => {
        const profileContent = JSON.parse(event.content);

        const profile: Profile = {
          relay: relayUrl,
          publicKey: event.pubkey,
          about: profileContent.about,
          lud06: profileContent.lud06,
          name: profileContent.name,
          nip05: profileContent.nip05,
          picture: profileContent.picture,
          website: profileContent.website,
        };

        setProfile(profile);
      };

      const onEOSE = () => { };

      subscribe([relayUrl], userFilter, onEvent, onEOSE);
    };

    subscribe([relayUrl], articleFilter, onEvent, onEOSE);
  };

  useEffect(() => {
    if (getArticleEvents(relayUrl).length > 0) {
      return;
    }
    getArticles();
  }, []);

  return (
    <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
      {/* Articles */}
      <div className="lg:grid-area: article mt-6 flex flex-col gap-16">
        {mounted &&
          articleEvents[relayUrl] &&
          articleEvents[relayUrl].map((event) => (
            <Article key={event.id} event={event} />
          ))}
      </div>

      {/* Sidebar */}
      <RelaySheet />
      <div className="hidden lg:block">
        <div className="lg:grid-area: sidebar sticky top-10 space-y-10 lg:pl-16 xl:pl-24">
          <div className="rounded-2xl border-2 border-zinc-200/80 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-base font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="ml-3 select-none">Recommended</span>
            </h2>
            <div className="ml-3 mt-6 space-y-6">
              <div className="flex flex-col items-start gap-y-4 text-zinc-800 dark:text-zinc-300">
                <span className="cursor-pointer text-zinc-700 hover:text-teal-500 dark:text-zinc-300 dark:hover:text-teal-400">
                  <Link href="https://neotweet.com/naddr1qq4ku6tsxq6z6etwvde8jur5v4jz6erfwfjkxapdd4jhxumpvajj6wfnxu6njdenvgerzwfhqy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsygpzq53v9set80efqp4jwh3zfv596e9mr8mehk5sdxgmevuxrcvvkspsgqqqw4rscdrz4r">
                    NIP-04: Encrypted Direct Message
                  </Link>
                </span>
                <span className="cursor-pointer text-zinc-700 hover:text-teal-500 dark:text-zinc-300 dark:hover:text-teal-400">
                  <Link href="https://neotweet.com/naddr1qq7xuet0we5k6ttyd9nxvetjv4h8gttfdeehgctvd3shg6t0dckk6et5dphkguedwpex7uedvdhkuuedvfsnqdf5xcunycmpx56sz9rhwden5te0wfjkccte9ejxzmt4wvhxjmczyq3q2gkzcv4nhu5sq6e8tc3yk2zavja3naumm2gxnydukwrpuxxtgqcyqqq823cv73txj">
                    Neovim Different Installation Methods Pros & Cons
                  </Link>
                </span>
                <span className="cursor-pointer text-zinc-700 hover:text-teal-500 dark:text-zinc-300 dark:hover:text-teal-400">
                  <Link href="https://neotweet.com/naddr1qqlkwctjd35kxttzwfjkzepdwa5hg6pdvd5x2etnv5khw6rpwskhg6r994ekx6t9de3k2tt5v4kxcuedw4ej6wp4xqunqdt9xqurvdfjqy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsygpzq53v9set80efqp4jwh3zfv596e9mr8mehk5sdxgmevuxrcvvkspsgqqqw4rs6x84xd">
                    Garlic bread with cheese: What the science tells us
                  </Link>
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-zinc-200/80 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-base font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="ml-3 select-none">Tags</span>
            </h2>
            <div className="ml-3 mt-6 space-y-6">
              <div className="flex flex-wrap items-start gap-4 text-zinc-800 dark:text-zinc-300">
                <Badge variant="tag">neovim</Badge>
                <Badge variant="tag">lazy</Badge>
                <Badge variant="tag">telescope</Badge>
                <Badge variant="tag">lua</Badge>
                <Badge variant="tag">vimscript</Badge>
                <Badge variant="tag">plugin</Badge>{' '}
              </div>
            </div>
          </div>

          <button
            className="relative flex items-center gap-x-2 rounded-full bg-teal-500/90 px-3 py-2 text-sm font-medium text-teal-50 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:bg-teal-500 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
            onClick={() => setRelayMenuIsOpen(true)}
          >
            <Icons.PencilSquare className="-mr-1 ml-1 flex size-4 items-center text-teal-50" />
            <span>write</span>
          </button>
        </div>
      </div>
    </div>
  );
}
