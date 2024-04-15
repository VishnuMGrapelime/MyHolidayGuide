'use client';
import { signInWithCustomToken } from 'firebase/auth';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Navigation } from '@/components/Header/Navigation';

import { auth } from '@/firebase/firebase';
import { setUserData } from '@/redux/slices/sessionSlice';

export const Header = ({ lang }: { lang: string }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.session.user);

  async function syncFirebaseAuth(session: any) {
    if (session && session.firebaseToken) {
      try {
        await signInWithCustomToken(auth, session.firebaseToken);
      } catch (error) {
        console.error('Error signing in with custom token:', error); // eslint-disable-line
      }
    } else {
      auth.signOut();
    }
  }

  React.useEffect(() => {
    async function updateUserData() {
      const session = await getSession();
      await syncFirebaseAuth(session);

      if (session?.user?.email) {
        dispatch(setUserData(session?.user?.email)); // commented temporarly
      }
    }

    updateUserData();

    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   // console.log('onAuthStateChanged');
    //   // console.log(user); // Returns: null
    // });
    // return () => unsubscribe();
  }, [dispatch]);

  return <Navigation user={user} lang={lang} />;
};
