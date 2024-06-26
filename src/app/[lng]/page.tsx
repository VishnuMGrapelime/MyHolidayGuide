'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
// export default function HomePage() {
import * as React from 'react';
import '@/lib/env';

import withAuth from '@/utils/withAuth';

import { useTranslation } from '../i18n/client';

import Logo from '~/svg/Logo.svg';
import { useSelector } from 'react-redux';

interface Params {
  lng: string;
}

const HomePage = ({ params: { lng } }: { params: Params }) => {
  const session = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect('/signin');
    // },
  });

  const user = useSelector((state: any) => state.session.user);
  console.log(session?.data?.user?.email);
  console.log(user);

  const { t } = useTranslation(lng, 'home-page');

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-16' />
          <div className=''>{session?.data?.user?.email}</div>
          <button className='' onClick={() => signOut()}>
            {t('logout')}
          </button>

          <h1 className='mt-4'>{t('main-title')}</h1>
          <p className='mt-2 text-sm text-gray-800'>{t('sub-title')}</p>
        </div>
      </section>
    </main>
  );
};

export default withAuth(HomePage);
