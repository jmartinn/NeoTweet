'use client';

import { useEffect, useState } from 'react';

import { useUserProfileStore } from '@/app/stores/user-profile-store';
import UserProfile from '@/components/profile/user-profile';

export default function Login({ children }: any) {
  const { userPublicKey, setUserPublicKey } = useUserProfileStore();
  // https://github.com/vercel/next.js/discussions/17443
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginHandler = async () => {
    if (typeof nostr !== 'undefined') {
      const publicKey: string = await nostr.getPublicKey();
      setUserPublicKey(publicKey);
    }
  };

  return (
    mounted && (
      <div>
        {userPublicKey === '' ? (
          <button onClick={loginHandler}>{children}</button>
        ) : (
          <UserProfile />
        )}
      </div>
    )
  );
}
