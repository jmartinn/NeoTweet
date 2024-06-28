import { usePostRelayStore } from '@/app/stores/post-relay-store';
import { useRelayInfoStore } from '@/app/stores/relay-info-store';

import { RelayCard } from './relay-card';
import { RelayCardSkeleton } from './relay-card-skeleton';

export default function PostRelayList() {
  const { getRelayInfo } = useRelayInfoStore();
  const {
    postRelays,
    updatePostRelayStatus,
    sortPostRelays,
    countActivePostRelays,
  } = usePostRelayStore();

  // TODO: Show paid relays

  const handleSetPostActive = (relay: any) => {
    if (countActivePostRelays() === 5) {
      alert('You can only have 5 active post relays.');
      return;
    }
    updatePostRelayStatus(relay.url, true);
    sortPostRelays();
  };

  const handleSetPostInactive = (relay: any) => {
    if (countActivePostRelays() === 1) {
      alert('You must have at least one active post relay.');
      return;
    }
    updatePostRelayStatus(relay.url, false);
    sortPostRelays();
  };
  return (
    <ul
      role="list"
      className="mt-4 flex-1 divide-y divide-slate-200 overflow-y-hidden dark:divide-zinc-700"
    >
      {postRelays.map((relay) => {
        const relayInfo = getRelayInfo(relay.url);
        return (
          <li key={relay.url}>
            {relayInfo ? (
              <RelayCard
                url={relay.url}
                isActive={relay.isActive}
                relayName={relayInfo.name}
                relayContact={relayInfo.contact}
                handleSetActive={handleSetPostActive}
                handleSetInactive={handleSetPostInactive}
              />
            ) : (
              <div className="py-6">
                <RelayCardSkeleton />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
