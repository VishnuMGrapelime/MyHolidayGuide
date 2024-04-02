'use client';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { auth } from '@/firebase/firebase';

import { useTranslation } from '../../app/i18n/client';

export const UserForgotPassword = ({ lang }) => {
  const [email, setEmail] = useState('');

  const router = useRouter();
  const { t } = useTranslation(lang, 'forgot-password');

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email);
    toast.success('Password reset email has been sent to your email');
    router.push('/en/signin');
  };

  return (
    <div>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          /> */}
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
            {t('title')}
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                {t('email-address')}
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => resetPassword()}
                disabled={!email}
                className='text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              >
                {t('send-reset-link')}
              </button>
            </div>
          </div>

          {/* <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{' '}
            <button onClick={() => router.push('signup')} className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              Sign Up
            </button>
          </p> */}
        </div>
      </div>
    </div>
  );
};
