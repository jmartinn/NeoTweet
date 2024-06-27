import { useReadRelayStore } from '@/app/stores/read-relay-store';
import { useRelayInfoStore } from '@/app/stores/relay-info-store';
import { useRelayStore } from '@/app/stores/relay-store';

import { RelayCard } from './relay-card';

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
    console.log('Setting read active');
    setRelayUrl(readRelay.url);
    setAllReadRelaysInactive();
    updateReadRelayStatus(readRelay.url, true);
    // TODO: maybe sort relays on component unmount?
    sortReadRelays();
  };

  return (
    <ul
      role="list"
      className="mt-4 flex-1 divide-y divide-slate-200 overflow-y-hidden dark:divide-zinc-700"
    >
      {readRelays.map((relay) => (
        <li key={relay.url}>
          {getRelayInfo(relay.url) && (
            <RelayCard
              url={relay.url}
              isActive={relay.isActive}
              relayName={getRelayInfo(relay.url).name}
              relayContact={getRelayInfo(relay.url).contact}
              handleSetActive={handleSetReadActive}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
