'use client';

import { useEffect, useState } from 'react';

import { useUserProfileStore } from '@/app/stores/user-profile-store';

import UserProfile from '../profile/user-profile';

export default function Login({ children }: { children: React.ReactNode }) {
  const { userPublicKey, setUserPublicKey } = useUserProfileStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginHandler = async () => {
    if (typeof window.nostr !== 'undefined') {
      const publicKey: string = await window.nostr.getPublicKey();
      setUserPublicKey(publicKey);
    }
  };

  return (
    mounted && (
      <div>
        {userPublicKey === '' ? (
          <button type="button" onClick={loginHandler}>
            {children}
          </button>
        ) : (
          <UserProfile />
        )}
      </div>
    )
  );
}
