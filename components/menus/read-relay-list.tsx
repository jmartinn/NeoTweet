import { useReadRelayStore } from '@/app/stores/read-relay-store';
import { useRelayInfoStore } from '@/app/stores/relay-info-store';
import { useRelayStore } from '@/app/stores/relay-store';

import { RelayCard } from './relay-card';
import { RelayCardSkeleton } from './relay-card-skeleton';

export default function ReadRelayList() {
  const { getRelayInfo } = useRelayInfoStore();
  const { setRelayUrl } = useRelayStore();
  const {
    readRelays,
    updateReadRelayStatus,
    sortReadRelays,
    setAllReadRelaysInactive,
  } = useReadRelayStore();

  const handleSetReadActive = (readRelay: any) => {
    setRelayUrl(readRelay.url);
    setAllReadRelaysInactive();
    updateReadRelayStatus(readRelay.url, true);
    sortReadRelays();
  };

  return (
    <ul
      role="list"
      className="mt-4 flex-1 divide-y divide-slate-200 overflow-y-hidden dark:divide-zinc-700"
    >
      {readRelays.map((relay) => {
        const relayInfo = getRelayInfo(relay.url);
        return (
          <li key={relay.url}>
            {relayInfo ? (
              <RelayCard
                url={relay.url}
                isActive={relay.isActive}
                relayName={relayInfo.name}
                relayContact={relayInfo.contact}
                handleSetActive={handleSetReadActive}
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
