import { useRouter } from 'next/navigation';
import { nip19, type Event } from 'nostr-tools';
import type { AddressPointer } from 'nostr-tools/nip19';

import { useArticleEventStore } from '@/app/stores/event-store';
import { useProfileStore } from '@/app/stores/profile-store';
import { useRelayStore } from '@/app/stores/relay-store';
import { getTagValues } from '@/lib/utils';

import { Icons } from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface ArticleProps {
  event: Event;
}

export function Article({ event }: ArticleProps): JSX.Element {
  const { relayUrl } = useRelayStore();
  const { setCachedEvent: setCachedArticleEvent } = useArticleEventStore();

  const { getProfile } = useProfileStore();

  const router = useRouter();

  const routeArticle = (): void => {
    const identifier = getTagValues('d', event.tags);

    // TODO: handle relays
    // TODO: add tag for applicacants
    const addressPointer: AddressPointer = {
      identifier,
      pubkey: event.pubkey,
      kind: 30023,
      relays: [relayUrl],
    };

    setCachedArticleEvent(event);
    router.push(nip19.naddrEncode(addressPointer));
  };

  return (
    <article
      onClick={routeArticle}
      className="group relative flex cursor-pointer flex-col items-start"
    >
      <div className="z-10 flex items-center gap-x-4 pb-2">
        <Avatar className="size-8">
          <AvatarImage src={getProfile(relayUrl, event.pubkey)?.picture} />
          <AvatarFallback className="text-xs font-medium">NT</AvatarFallback>
        </Avatar>

        <span className="flex items-center" aria-hidden="true">
          <span className="bg-muted-foreground h-5 w-0.5 rounded-full" />
        </span>

        <time className="text-muted-foreground z-10 flex items-center text-sm">
          {new Date(event.created_at * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {' • '}
        <p className="text-muted-foreground text-sm">Damus</p>
      </div>
      <h2 className="text-base font-semibold tracking-tight">
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">
          {getTagValues('title', event.tags)}
        </span>
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      </h2>
      <p className="text-muted-foreground relative z-10 mt-2 text-justify text-sm">
        {getTagValues('summary', event.tags)}
      </p>
      <Badge variant="secondary" className="z-10 mt-4">
        NeoVim
      </Badge>
      <div
        aria-hidden="true"
        className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
      >
        Read article
        <Icons.ChevronRight className="ml-1 size-4 text-teal-500" />
      </div>
      <div className="text-muted-foreground relative z-10 mt-4 flex items-center gap-x-4 text-sm">
        <div className="flex items-center gap-x-1">
          <Icons.Heart className="size-5 cursor-pointer" />
          <span>418</span>
        </div>
        <div className="flex items-center gap-x-1">
          <Icons.Comment className="size-5 cursor-pointer" />
          <span>53</span>
        </div>
      </div>{' '}
    </article>
  );
}
