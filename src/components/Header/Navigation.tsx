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

export const Navigation = ({ user, lang }: { user: any, lang: any }) => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  // const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const router = useRouter();
  const { t } = useTranslation(lang);
  const pathname = usePathname();
  const [isAdminPage, setIsAdminPage] = useState(true);
  const [isSamePage, setIsSamePage] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleLogout = () => {
    signOut().then(() => {
      router.push(`/${lang}`);
      removeFromSessionStorage('firebaseToken');
    });
  };

  useEffect(() => {
    const url = window.location.pathname;


    const pathArray = url.split('/');
    console.log(pathArray[2]);
    console.log(pathArray[1]);

    if (url.includes('/admin')) {
      if (pathArray[2] == 'admin' || pathArray[1] == 'admin') {
        setIsAdminPage(true);
      }

    } else {
      if (pathArray[2] == 'Supplier' || pathArray[1] == 'Supplier') {
        console.log("samepage");
        setIsSamePage(true);
      } else {
        setIsSamePage(false);
      }
      setIsAdminPage(false);
    }
  }, [pathname]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('color-theme');
    const initialTheme = storedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('color-theme', newTheme);
  };

  return (
    <nav className='xl:container mx-auto px-4 lg:px-20 py-9 md:py-0 dark:text-neutral-50 sticky z-10'>
      <div className=' flex flex-wrap items-center justify-between '>
        <Link
          href={isSamePage ? "#" : "/Supplier"}
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <Image src={Logo} className=' w-12' alt='Logo' width='80' />
        </Link>
        <div className='flex flex-wrap gap-7  justify-between '>
          {!isAdminPage && (
            <>
              <div
                className='items-center justify-between hidden w-full md:flex md:w-auto'
                ref={themeSwitcherRef}
              >
                <LangSwitcher lang={lang} />
              </div>
            </>
          )}
          <button
            id='theme-toggle'
            type='button'
            className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
            onClick={toggleTheme}
          >
            {theme === 'light' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-sun'
              >
                <circle cx='12' cy='12' r='4' />
                <path d='M12 2v2' />
                <path d='M12 20v2' />
                <path d='m4.93 4.93 1.41 1.41' />
                <path d='m17.66 17.66 1.41 1.41' />
                <path d='M2 12h2' />
                <path d='M20 12h2' />
                <path d='m6.34 17.66-1.41 1.41' />
                <path d='m19.07 4.93-1.41 1.41' />
              </svg>
            )}
            {theme === 'dark' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-moon'
              >
                <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
              </svg>
            )}
          </button>
        </div>


      </div>
    </nav>
  );
};
