import RelayIcon from './relay-icon';

type Relay = {
  url: string;
  isActive: boolean;
};

interface RelayCardProps extends Relay {
  relayName: string;
  relayContact: string;
  handleSetActive: (relay: Relay) => void;
  handleSetInactive?: (relay: Relay) => void;
}

export function RelayCard(props: RelayCardProps) {
  return (
    <div className="group relative flex items-center px-2 py-6">
      <div className="-m-1 block flex-1 p-1">
        <div className="absolute inset-0" aria-hidden="true" />
        <div className="relative flex min-w-0 flex-1 items-center">
          <span className="relative inline-block shrink-0">
            <RelayIcon
              src={
                props.url.replace('wss://', 'https://').replace('relay.', '') +
                '/favicon.ico'
              }
              alt={props.relayName}
            />
          </span>
          <div className="ml-4 truncate">
            {props.isActive ? (
              <>
                <p className="w-[125px] truncate text-sm font-medium text-slate-900 dark:text-zinc-100">
                  <span>{props.relayName.substring(0, 5)}</span>
                  <span className="z-20 inline-flex select-none items-center px-2 text-xs font-medium text-green-600 dark:text-green-400 dark:ring-green-500/20">
                    Active
                  </span>
                </p>
                <p className="w-[145px] truncate text-sm text-slate-500">
                  {props.relayContact}
                </p>
              </>
            ) : (
              <>
                <p className="w-[125px] truncate text-sm font-medium text-slate-900 dark:text-zinc-100">
                  {props.relayName}
                </p>
                <p className="w-[145px] truncate text-sm text-slate-500">
                  {props.relayContact}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {props.isActive ? (
          props.handleSetInactive && (
            <button
              onClick={() => props.handleSetInactive!(props)}
              className="z-20 inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:ring-red-500/50 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20 dark:hover:ring-red-400/60"
            >
              Set Inactive
            </button>
          )
        ) : (
          <button
            onClick={() => props.handleSetActive(props)}
            className="z-20 inline-flex items-center rounded-md bg-purple-50 px-3 py-2 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 hover:ring-purple-600/50 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30 dark:hover:ring-purple-400/70"
          >
            Set Active
          </button>
        )}
      </div>
    </div>
  );
}
