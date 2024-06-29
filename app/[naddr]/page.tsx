'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nip19, type Event } from 'nostr-tools';
import type { AddressPointer } from 'nostr-tools/nip19';

import { useArticleEventStore } from '@/app/stores/event-store';
import { useProfileStore } from '@/app/stores/profile-store';
import { useRelayStore } from '@/app/stores/relay-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTagValues } from '@/lib/utils';

export default function Blog() {
  const { subscribe, relayUrl } = useRelayStore();
  const { getProfile } = useProfileStore();
  const {
    cachedEvent: cachedArticleEvent,
    setCachedEvent: setCachedArticleEvent,
  } = useArticleEventStore();

  const [naddr, setNaddr] = useState<string>('');
  const [naddrPointer, setNaddrPointer] = useState<AddressPointer>();
  // TODO: get this event from cache, should cache after click since we already get it on the home page
  const [articleEvent, setArticle] = useState<Event>();
  const pathname = usePathname();
  let naddrStr = '';
  if (pathname && pathname.length > 60) {
    naddrStr = pathname.split('/').pop() ?? '';
    // console.log('naddrStr', naddrStr);
  }

  useEffect(() => {
    if (naddrStr) {
      // console.log('naddr', naddr);
      const NaddrData = nip19.decode(naddrStr).data;
      // console.log('naddr_data', naddr_data);
      setNaddr(naddrStr);
      setNaddrPointer(NaddrData);

      if (naddrPointer) {
        if (cachedArticleEvent) {
          // console.log('cachedArticleEvent', cachedArticleEvent);
          setArticle(cachedArticleEvent);
          setCachedArticleEvent(null);
          return;
        }
        // console.log('subscribing to article');
        const onEvent = (event: never) => {
          console.log('article event', event);
          setArticle(event);
        };

        const onEOSE = () => {
          // console.log('article eose');
          // console.log('articleEvent', articleEvent);
        };

        const filter = {
          kinds: [naddrPointer.kind],
          authors: [naddrPointer.pubkey],
          '#d': [naddrPointer.identifier],
        };

        if (naddrPointer.relays) {
          // console.log('TRYING TO SUBSCRIBE TO RELAY');
          // console.log('naddrPointer.relays[0]', naddrPointer.relays[0]);
          subscribe([naddrPointer.relays[0]], filter, onEvent, onEOSE);
        } else {
          subscribe([relayUrl], filter, onEvent, onEOSE);
        }
      }
    }
  }, [naddr]);

  function setupMarkdown(content: string) {
    const md = require('markdown-it')();
    const result = md.render(content || '');
    return result;
  }

  const markdown = setupMarkdown(articleEvent?.content || '');

  return (
    <div className="xl:relative">
      {articleEvent ? (
        <div className="mx-auto max-w-3xl">
          <header className="flex flex-col">
            <h1 className="mt-6 text-5xl font-bold tracking-tighter">
              {getTagValues('title', articleEvent.tags)}
            </h1>
            <div className="mt-6 flex items-center gap-4 pb-2">
              <Avatar className="size-10">
                {' '}
                <AvatarImage
                  src={getProfile(relayUrl, articleEvent.pubkey)?.picture}
                />
                <AvatarFallback className="text-xs font-medium">
                  NT
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium">
                  {getProfile(relayUrl, articleEvent.pubkey)?.name}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <p className="text-muted-foreground text-sm">
                      Published in
                    </p>
                    <Link
                      className="text-sm hover:underline"
                      href="/tags/neovim"
                    >
                      {' '}
                      Damus
                    </Link>
                  </div>
                  <span
                    className="bg-muted-foreground/40 h-4 w-0.5 rounded-full"
                    aria-hidden="true"
                  />{' '}
                  <time
                    dateTime="2022-09-05"
                    className="text-sm text-zinc-400 dark:text-zinc-500"
                  >
                    {new Date(
                      articleEvent.created_at * 1000,
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </div>
          </header>
          <hr className="border-muted-foreground dark:border-muted-foreground/40 mt-8" />
          <article
            dangerouslySetInnerHTML={{ __html: markdown }}
            className="prose dark:prose-invert mt-8"
          />
        </div>
      ) : null}
    </div>
  );
}
