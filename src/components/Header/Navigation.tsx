import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

import { removeFromSessionStorage } from '@/lib/helper';

import LangSwitcher from './LangSwitcher';
import { useTranslation } from '../../app/i18n/client';

// import logo from '/images/Logo.png';
import Logo from '~/images/Logo.png';
import TempProfile from '~/images/profile.png';
import { Sun } from 'lucide-react';

export const Navigation = ({ user, lang }) => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  // const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const router = useRouter();
  const { t } = useTranslation(lang);
  const pathname = usePathname();
  const [isAdminPage, setIsAdminPage] = useState(true);

  const handleLogout = () => {
    signOut().then(() => {
      router.push(`/${lang}`);
      removeFromSessionStorage('firebaseToken');
    });
  };

  useEffect(() => {
    const url = window.location.pathname;
    const pathArray = url.split('/');
    if (url.includes('/admin')) {
      if (pathArray[2] == 'admin' || pathArray[1] == 'admin') {
        setIsAdminPage(true);
      }
    } else {
      setIsAdminPage(false);
    }
  }, [pathname]);

  return (
    <nav className='py-9 md:py-0 px-4 dark:text-neutral-50 sticky z-10'>
      <div className='xl:container mx-auto flex flex-wrap items-center justify-between '>
        <div className='flex flex-wrap gap-7  justify-between'>

          <Link
            href='http://localhost:3000/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <Image
              src={Logo}
              className='h-15'
              alt='Logo'
              width='80'
            />
          </Link>
          {!isAdminPage && (
            <>
              <div
                className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
                ref={themeSwitcherRef}
              >
                <LangSwitcher lang={lang} />
              </div>
            </>
          )}
        </div>


        <Sun 
        size={28} />
       </div>
    </nav>
  );
};
