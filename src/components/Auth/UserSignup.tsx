'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { auth } from '@/firebase/firebase';
import { addData } from '@/firebase/firestore/data';

import { useTranslation } from '../../app/i18n/client';

export const UserSignup = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const { t } = useTranslation(lang, 'signup');

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        const userDetails = {
          email: user.email,
          userId: user.uid,
          userRole: 'editor',
          displayName: '',
          createdAt: user.metadata.createdAt,
        };

        const { error } = addData('users', userDetails);

        if (error) {
          toast.error(error);
        }

        setEmail('');
        setPassword('');
        setPasswordAgain('');
        toast.success('User created successfully');
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          /> */}
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight '>
          {t('title')}
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 '
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
                className='block w-full rounded-md border-1 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 '
              >
                {t('password')}
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
                required
                className='block w-full rounded-md border-1 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 '
              >
                {t('password-again')}
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='passwordAgain'
                name='passwordAgain'
                type='password'
                autoComplete='current-password'
                onChange={(e) => setPasswordAgain(e.target.value)}
                required
                className='block w-full rounded-md border-1 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              disabled={
                !email ||
                !password ||
                !passwordAgain ||
                password !== passwordAgain
              }
              onClick={() => signup()}
              className='disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              {t('signup')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
