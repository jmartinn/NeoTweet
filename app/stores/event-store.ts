import type { Event } from 'nostr-tools';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface EventState<T> {
  events: Record<string, Array<T>>;
  setEvents: (relayUrl: string, events: Array<T>) => void;
  getEvents: (relayUrl: string) => Array<T>;
  cachedEvent: T | null;
  setCachedEvent: (event: T | null) => void;
  getCachedEvent: () => T | null;
}

const createEventStore = <T>() => {
  return create<EventState<T>>()(
    devtools(
      persist(
        (set, get) => ({
          events: {},
          setEvents: (relayUrl, events) =>
            set((prev) => ({
              events: { ...prev.events, [relayUrl]: events },
            })),
          getEvents: (relayUrl: string) => get().events[relayUrl] ?? [],
          cachedEvent: null,
          setCachedEvent: (event) => set({ cachedEvent: event }),
          getCachedEvent: () => get().cachedEvent,
        }),
        {
          name: 'nostrnotes-event-storage',
          storage: createJSONStorage(() => sessionStorage),
        },
      ),
    ),
  );
};

export const useArticleEventStore = createEventStore<Event>();
export const useNoteEventStore = createEventStore<Event>();
