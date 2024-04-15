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
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';

// Yup schema to validate the form
const schema = Yup.object().shape({
  emailId: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

export const UserSignIn = ({ lang }: { lang: string }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const [formState, setFormState] = useState({
    emailId: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    window.scrollTo(0, 0)
    setErrorStatus(false);


    try {
      // Validate the form data
      console.log(formState);
      await schema.validate(formState, { abortEarly: false });

      console.log('Form is valid', formState);
      const email = formState.emailId;
      const password = formState.password;
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

    } catch (error) {
      setErrorStatus(true);
      if (error instanceof Yup.ValidationError) {
        // Update the errors state with the validation errors
        const errorMessages = error.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        console.log(errorMessages);
        setErrors(errorMessages);
      }
    }


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
    <div>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>

        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
          {t('title')}
        </h2>
      </div>
      {errorStatus && <ValidationBox errors={errors} />}
      <form onSubmit={onSubmit} className='mt-10'>
        <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='emailId'
                value={formState.emailId}
                onChange={handleChange}
              />
              <label
                htmlFor='default_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('emailId.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                {/* <ClipboardCheck color='#1CCFB9' /> */}
              </div>
            </div>
            <p className='text- md:text- px-4 label '>
              <span>{t('emailId.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type={showPassword ? 'text' : 'password'}
                id='default_outlined'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='password'
                value={formState.password}
                onChange={handleChange}
              />
              <label
                htmlFor='default_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('password.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                {/* <ClipboardCheck color='#1CCFB9' /> */}
                {showPassword ? (

                  <EyeOff color='#1CCFB9' onClick={togglePasswordVisibility} />
                ) : (
                  <Eye color='#1CCFB9' onClick={togglePasswordVisibility} />
                )}

              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>{t('password.label')}</span>
            </p>
          </div>
          <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-end w-full'>

            <Button label={t('signinButton')} />
          </div>
        </div>

      </form>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>

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
      </Formik> */}
    </div >
  );
};
