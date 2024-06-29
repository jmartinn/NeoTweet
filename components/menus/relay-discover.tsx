import { useEffect, useState } from 'react';

import Fuse from 'fuse.js';

import { usePostRelayStore } from '@/app/stores/post-relay-store';
import { useReadRelayStore } from '@/app/stores/read-relay-store';
import { useRelayInfoStore } from '@/app/stores/relay-info-store';
import { useRelayStore } from '@/app/stores/relay-store';
import { Icons } from '@/components/icons';

import { Input } from '../ui/input';

import RelayIcon from './relay-icon';

const options = {
  includeScore: false,
  includeMatches: false,
  minMatchCharLength: 2,
  findAllMatches: true,
  threshold: 0.1,
  keys: ['name', 'id', 'description', 'url', 'contact'],
};

export default function RelayDiscover() {
  const { getRelayInfo, getAllRelayInfo, addRelayInfo } = useRelayInfoStore();
  const { postRelays, addPostRelay } = usePostRelayStore();
  const { readRelays, addReadRelay } = useReadRelayStore();
  const { allRelays } = useRelayStore();

  const [query, setQuery] = useState('');
  const [relaySearch, setRelaySearch] = useState<any[]>([]);

  function excludeItems(original: any[], exclude: any[]): any[] {
    const excludeUrls = exclude.map((item) => item.url);
    return original.filter((item) => !excludeUrls.includes(item.url));
  }

  const fuse = new Fuse(
    excludeItems(getAllRelayInfo(), [...postRelays, ...readRelays]),
    options,
  );

  useEffect(() => {
    allRelays.forEach((relayUrl) => {
      const cachedRelayInfo = getRelayInfo(relayUrl);
      const relayHttpUrl = relayUrl.replace('wss://', 'https://');
      if (cachedRelayInfo === undefined) {
        const fetchRelayInfo = async (url: string) => {
          try {
            const response = await fetch(url, {
              headers: {
                Accept: 'application/nostr+json',
              },
            });
            const data = await response.json();
            addRelayInfo(relayUrl, data);
          } catch (error) {
            console.error(`Error fetching relay information: ${error}`);
          }
        };
        fetchRelayInfo(relayHttpUrl);
      }
    });
  }, [addRelayInfo, getRelayInfo, allRelays]);

  useEffect(() => {
    const matchingRelays: any = fuse.search(query).slice(0, 300);
    setRelaySearch(matchingRelays);
  }, [query, fuse]);

  const handleAddRelay = (relayUrl: string) => {
    addPostRelay(relayUrl, true);
    addReadRelay(relayUrl, true);
  };

  function SearchItem(relay: any) {
    return (
      <li key={relay.url}>
        <div className="group relative z-20 flex items-center px-2 py-6">
          <div className="-m-1 block flex-1 p-1">
            <div className="absolute inset-0" aria-hidden="true" />
            <div className="relative flex min-w-0 flex-1 items-center">
              <span className="relative inline-block shrink-0">
                {relay.url && (
                  <RelayIcon
                    src={
                      relay.url
                        .replace('wss://', 'https://')
                        .replace('relay.', '') + '/favicon.ico'
                    }
                    alt={relay.name}
                  />
                )}
              </span>
              <div className="ml-4 truncate">
                <p className="w-[125px] truncate text-sm font-medium text-slate-900 dark:text-zinc-100">
                  {relay.name}
                </p>
                <p className="w-[145px] truncate text-sm text-slate-500">
                  {relay.contact}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleAddRelay(relay.url)}
            className="z-20 inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:ring-blue-600/50 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:ring-blue-400/70"
          >
            Add
          </button>
        </div>
      </li>
    );
  }
  return (
    <>
      <div className="relative mt-6">
        <Icons.Search className="text-muted-foreground absolute left-2 top-2.5 size-4" />
        <Input
          placeholder="Search"
          id="search"
          name="search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="pl-8"
        />
      </div>
      <div className="">
        <div className="mt-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <ul
            role="list"
            className="flex-1 divide-y divide-zinc-200 border-t border-zinc-200 pr-4 dark:divide-zinc-700 dark:border-zinc-700"
          >
            {relaySearch.length > 0
              ? relaySearch.map((relay: any) => SearchItem(relay.item))
              : excludeItems(getAllRelayInfo(), [
                ...postRelays,
                ...readRelays,
              ]).map((relay: any) => SearchItem(relay))}{' '}
          </ul>
        </div>
      </div>
    </>
  );
}
