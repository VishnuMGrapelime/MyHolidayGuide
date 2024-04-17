'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { useTranslation } from '../../app/i18n/client';
import { useState } from 'react';
import { ClipboardCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';
import { signInAndSync } from "@/utils/auth";

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
      const responseData: any = await signInAndSync('credentials', email, password, router, dispatch);

      if (responseData != "Authsuccess") {
        toast.error(responseData);
      }
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
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>

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

          </div>
          <div className='py-6 flex flex-col mx-auto gap-y-6 md:gap-x-20 md:flex-row w-full'>

            <Button label={t('signinButton')} />
          </div>

          <div className='flex items-start mb-5'>
            <div className='flex items-center h-5'>
              <input
                id='terms'
                type='checkbox'
                name='acceptTerms'
                // checked={formState.acceptTerms}
                //onChange={(e) => setTermsAndConditions(e.target.checked)}
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 
              focus:ring-[#1CCFB9] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#1CCFB9] 
              |dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 custom-checkbox'
              />
            </div>
            <label
              htmlFor='acceptTerms'
              className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              {t('rememberme')}{' '}

            </label>
          </div>
        </div>

      </form>
    </div >
  );
};
