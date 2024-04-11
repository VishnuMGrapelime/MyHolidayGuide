'use client';
import { signInWithCustomToken } from 'firebase/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { auth } from '@/firebase/firebase';
import { setUserData } from '@/redux/slices/sessionSlice';

import { useTranslation } from '../../app/i18n/client';

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

export const UserSignIn = ({ lang }: { lang: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { t } = useTranslation(lang, 'signin');

  async function syncFirebaseAuth(session: any) {
    if (session && session.firebaseToken) {
      try {
        // console.log("signin with custom token"+session.firebaseToken);
        await signInWithCustomToken(auth, session.firebaseToken);
      } catch (error) {
        console.error('Error signing in with custom token:', error); // eslint-disable-line
      }
    } else {
      auth.signOut();
    }
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = ({ email, password }: { email: any, password: any }) => {
    signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: `/${lang}`,
    }).then(async (response: any) => {
      if (response?.ok) {
        const session = await getSession();
        await syncFirebaseAuth(session);
        //dispatch(setUserData(email)); // commented temporarily to bypass the error

        router.push(`/${lang}`);
      } else {
        toast.error('Invalid Username or password');
      }
    });
    // .then(async ({ ok }) => {
    //   if (ok) {
    //     const session = await getSession();
    //     await syncFirebaseAuth(session);
    //     dispatch(setUserData(email));

    //     router.push(`/${lang}`);
    //   } else {
    //     // console.log(error);
    //     toast.error('Invalid Username or password');
    //   }
    // });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <Form>
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
                  <Field
                    type='email'
                    name='email'
                    className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage name='email' component='div' />

                  {/* <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    value={values.name}
                    onChange={handleChange}
                    required
                    className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  /> */}
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
                  <div className='text-sm'>
                    <div
                      onClick={() => router.push(`/${lang}/forgot-password`)}
                      className='cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300'
                    >
                      {t('forgot-password')}
                    </div>
                  </div>
                </div>
                <div className='mt-2'>
                  {/* <input
                    id='password'
                    name='password'
                    type='password'
                    value={values.password}
                    autoComplete='current-password'
                    onChange={handleChange}
                    required
                    className='block w-full rounded-md border-1 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  /> */}

                  <Field
                    type='password'
                    name='password'
                    className='block w-full rounded-md border-1 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage name='password' component='div' />
                </div>
              </div>

              <div>
                <button
                  //onClick={() => handleLogin()}
                  //disabled={!email || !password}
                  type='submit'
                  className='text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                >
                  {t('signin')}
                </button>
              </div>
            </div>

            <p className='mt-10 text-center text-sm text-gray-400'>
              {t('not-a-member')}{' '}
              <button
                onClick={() => router.push(`/${lang}/signup`)}
                className='font-semibold leading-6 text-indigo-400 hover:text-indigo-300'
              >
                {t('signup')}
              </button>
            </p>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
