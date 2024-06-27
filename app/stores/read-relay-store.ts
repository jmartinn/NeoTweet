import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type Relay = {
  url: string;
  isActive: boolean;
};

interface RelayState {
  readRelays: Relay[];
  addReadRelay: (url: string, isActive: boolean) => void;
  removeReadRelay: (url: string) => void;
  updateReadRelayStatus: (url: string, isActive: boolean) => void;
  sortReadRelays: () => void;
  setAllReadRelaysInactive: () => void;
}

export const useReadRelayStore = create<RelayState>()(
  devtools(
    persist(
      (set) => ({
        // TODO: populate this on login
        // TODO: make sure the active relay matches
        readRelays: [
          { url: 'wss://relay.damus.io', isActive: true },
          { url: 'wss://nos.lol', isActive: false },
          { url: 'wss://nostr.wine/', isActive: false },
        ], // <-- Initialized "empty"; to be populated dynamically

        addReadRelay: (url, isActive) =>
          set((state) => ({
            readRelays: [...state.readRelays, { url, isActive }],
          })),

        removeReadRelay: (url) =>
          set((state) => ({
            readRelays: state.readRelays.filter((relay) => relay.url !== url),
          })),

        updateReadRelayStatus: (url, isActive) =>
          set((state) => ({
            readRelays: state.readRelays.map((relay) =>
              relay.url === url ? { ...relay, isActive } : relay,
            ),
          })),

        sortReadRelays: () =>
          set((state) => ({
            readRelays: [...state.readRelays].sort((a, b) =>
              a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1,
            ),
          })),

        setAllReadRelaysInactive: () =>
          set((state) => ({
            readRelays: state.readRelays.map((relay) => ({
              ...relay,
              isActive: false,
            })),
          })),
      }),
      {
        name: 'neotweet-read-relay-store',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
