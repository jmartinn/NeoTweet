import { useEffect, useState } from 'react';

import type { Event } from 'nostr-tools';

import { useRelayStore } from '@/app/stores/relay-store';
import { useUserProfileStore } from '@/app/stores/user-profile-store';
import type { EventProfileContent, Profile } from '@/app/types';
import { RELAYS } from '@/lib/constants';
import { shortenHash } from '@/lib/utils';

import UserMenu from '../menus/user-menu';

export default function UserProfile() {
  const { subscribe, activeRelay, connect, relayUrl, setRelayUrl } =
    useRelayStore();
  const { getUserPublicKey, getUserProfile, setUserProfile, setUserEvent } =
    useUserProfileStore();
  const [currentProfile, setCurrentProfile] = useState<Profile>();

  useEffect(() => {
    if (activeRelay === undefined) {
      connect(RELAYS[0]);
    }
  }, []);

  const getEvents = async () => {
    console.log('GET EVENTS FOR', relayUrl);
    if (currentProfile && currentProfile.relay === relayUrl) {
      return;
    }

    const cachedProfile = getUserProfile(relayUrl);

    if (cachedProfile) {
      setCurrentProfile(cachedProfile);
      return;
    }

    // maybe get followers here too?
    // let kinds = [0, 3];
    let kinds = [0];

    const filter = {
      kinds,
      authors: [getUserPublicKey()],
      limit: 5,
    };

    const onEvent = (event: Event) => {
      console.log('event', event);
      setUserEvent(event);
      const eventContent: EventProfileContent = JSON.parse(event.content);

      const profile: Profile = {
        relay: relayUrl || '',
        publicKey: getUserPublicKey() || '',
        name: eventContent.name || shortenHash(getUserPublicKey()) || '',
        about: eventContent.about || '',
        picture: eventContent.picture || '',
        nip05: eventContent.nip05 || '',
        website: eventContent.website || '',
        lud06: eventContent.lud06 || '',
      };

      setUserProfile(relayUrl, profile);
      setCurrentProfile(profile);
    };

    const onEOSE = () => {};

    subscribe([relayUrl], filter, onEvent, onEOSE);
  };

  useEffect(() => {
    getEvents();
  }, [relayUrl, activeRelay, setRelayUrl]);

  return (
    <>
      <UserMenu>
        {currentProfile && (
          <img
            className="mt-1.5 inline-block size-10 rounded-full shadow-lg shadow-zinc-800/10 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/10"
            src={currentProfile.picture}
            alt=""
          />
        )}
      </UserMenu>
    </>
  );
}
