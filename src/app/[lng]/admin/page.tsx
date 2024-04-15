'use client';

import { useSession } from 'next-auth/react';
// export default function HomePage() {
import * as React from 'react';
import '@/lib/env';

import withAuth from '@/utils/withAuth';

import { useTranslation } from '../../i18n/client';
import { useSelector } from 'react-redux';
import SideMenu from '@/components/Admin/SideMenu/SideMenu';

interface Params {
  lng: string;
}

const AdminPage = ({ params: { lng } }: { params: Params }) => {
  const session = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect('/signin');
    // },
  });

  const user = useSelector((state: any) => state.session.user);

  // if (user?.userRole !== 'admin') {
  //   return <p>Restricted page</p>;
  // }

  const { t } = useTranslation(lng, 'home-page');

  return (
    <main>
      <SideMenu />
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h1>Admin Dashboard</h1>
          {/* <Logo className='w-16' /> */}
          {/* <div className='text-white'>{session?.data?.user?.email}</div>
          <button className='' onClick={() => signOut()}>
            {t('logout')}
          </button> */}

          <h1 className='mt-4'>{t('main-title')}</h1>
          {/* <p className='mt-2 text-sm text-gray-800'>{t('sub-title')}</p> */}
        </div>
      </section>
    </main>
  );
};

export default withAuth(AdminPage);
