import { useReadRelayStore } from '@/app/stores/read-relay-store';
import { useRelayInfoStore } from '@/app/stores/relay-info-store';
import { useRelayStore } from '@/app/stores/relay-store';

import RelayIcon from './relay-icon';

export default function ReadRelayCards() {
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
      className="mt-4 flex-1 divide-y divide-slate-200 overflow-y-auto dark:divide-zinc-700"
    >
      {readRelays.map((readRelay) => (
        <li key={readRelay.url}>
          <div className="group relative flex items-center px-5 py-6">
            <div className="-m-1 block flex-1 p-1">
              <div className="absolute inset-0" aria-hidden="true" />
              <div className="relative flex min-w-0 flex-1 items-center">
                <span className="relative inline-block shrink-0">
                  <RelayIcon
                    src={
                      readRelay.url
                        .replace('wss://', 'https://')
                        .replace('relay.', '') + '/favicon.ico'
                    }
                    fallback="https://user-images.githubusercontent.com/29136904/244441447-d6f64435-6155-4ffa-8574-fb221a3ad412.png"
                    alt=""
                  />
                </span>
                <div className="ml-4 truncate">
                  {getRelayInfo(readRelay.url) &&
                    (readRelay.isActive ? (
                      <>
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-zinc-100">
                          <span>{getRelayInfo(readRelay.url).name}</span>
                          <span className="z-20 inline-flex select-none items-center px-2 text-xs font-medium text-green-600 dark:text-green-400 dark:ring-green-500/20">
                            Active
                          </span>
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {getRelayInfo(readRelay.url).contact}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-zinc-100">
                          {getRelayInfo(readRelay.url).name}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {getRelayInfo(readRelay.url).contact}
                        </p>
                      </>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!readRelay.isActive && (
                <button
                  onClick={() => handleSetReadActive(readRelay)}
                  className="z-20 inline-flex items-center rounded-md bg-purple-50 px-3 py-2 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 hover:ring-purple-600/50 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30 dark:hover:ring-purple-400/70"
                >
                  Set Active
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
