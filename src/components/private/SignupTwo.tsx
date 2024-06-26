import { ClipboardCheck, Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import DynamicTabs from '@/components/DynamicTabs';
import { Button, ButtonOutline } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';
import { useTranslation } from '@/app/i18n/client';

// Yup schema to validate the form


const SignUpTwo = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
  finalSubmit,
  lang
}: {
  nextStep: any,
  prevStep: any,
  formData: any,
  updateFormData: any,
  finalSubmit: any,
  lang: any
}) => {

  const { t } = useTranslation(lang, 'privateRegistration-page');

  const schema = Yup.object().shape({
    email: Yup.string().email().required(t('step2.email.validation')),
    phone: Yup.string().required(t('step2.phone.validation')),
    personalWebsite: Yup.string().required(t('step2.personalWebsite.validation')),
    password: Yup.string()
      .min(6)
      .max(24)
      .required(t('step2.password.validation')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    preferedLanguage: Yup.string().required(t('step2.preferedLanguage.validation')),
  });



  const [formState, setFormState] = useState({
    email: '',
    phone: '',
    personalWebsite: '',
    password: '',
    confirmPassword: '',
    preferedLanguage: 'english',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCnPassword, setCnShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCnPasswordVisibility = () => {

    setCnShowPassword(!showCnPassword);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    if (formData) {
      setFormState({
        email: formData.email,
        phone: formData.phone,
        personalWebsite: formData.personalWebsite,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        preferedLanguage: formData.preferedLanguage
          ? formData.preferedLanguage
          : formState.preferedLanguage,
      });

      if (formData.socialTabs) {
        setTabs(formData.socialTabs);
      }
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const [errors, setErrors] = useState({
    email: formData.email,
    phone: formData.phone,
    personalWebsite: formData.personalWebsite,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    preferedLanguage: formData.preferedLanguage,
  });

  const [tabs, setTabs] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    window.scrollTo(0, 0)
    setErrorStatus(false);

    try {
      // Validate the form data
      console.log(formState);
      await schema.validate(formState, { abortEarly: false });

      console.log('Form is valid', formState);
      finalSubmit(formState);
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

  const gotoPrevStep = () => {
    if (tabs) {
      updateFormData({ ...formState, socialTabs: tabs });
    } else {
      updateFormData(formState);
    }
    prevStep();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='py-6 md:m-12 md:p-12'>
          <div className='w-full  mx-auto  md:text-center'>
            <h2 className='pb-6 md:pb-6 md:leading-6 text-h2 md:text-[2.35rem] font-bold  whitespace-nowrap'>
              <span>{t('step2Text')}</span>
            </h2>
            <p className='text-p1 md:text-[1.3125rem] leading-6 font-bold  whitespace-nowrap'>
              <span>{t('step2.subtext1')}</span>
            </p>
            <p className='text-[1rem] leading-6 pt-2 md:pt-9'>
              <span>
                {t('step2.subtext2')}
              </span>
            </p>
          </div>
        </div>
        {errorStatus && <ValidationBox errors={errors} />}

        <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='email'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='email'
                value={formState.email}
                onChange={handleChange}
              />
              <label
                htmlFor='email'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step2.email.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step2.email.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='phone'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='phone'
                value={formState.phone}
                onChange={handleChange}
              />
              <label
                htmlFor='phone'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step2.phone.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step2.phone.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='personalWebsite'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-[#1CCFB9] rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='personalWebsite'
                value={formState.personalWebsite}
                onChange={handleChange}
              />
              <label
                htmlFor='personalWebsite'
                className='absolute text-sm text-[#1CCFB9] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step2.personalWebsite.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step2.personalWebsite.label')}</span>
            </p>
          </div>
          <div>
            <div className='mt-2 '>
              <DynamicTabs tabs={tabs} setTabs={setTabs} lang={lang} d={"d"} />
            </div>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='password'
                value={formState.password}
                onChange={handleChange}
              />
              <label
                htmlFor='password'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step2.password.placeholder')}
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
            <p className='text- md:text- px-4 '>
              <span>{t('step2.password.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type={showCnPassword ? 'text' : 'password'}
                id='confirmPassword'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='confirmPassword'
                value={formState.confirmPassword}
                onChange={handleChange}
              />
              <label
                htmlFor='confirmPassword'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step2.confirmPassword.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                {/* <ClipboardCheck color='#1CCFB9' /> */}
                {showCnPassword ? (

                  <EyeOff color='#1CCFB9' onClick={toggleCnPasswordVisibility} />
                ) : (
                  <Eye color='#1CCFB9' onClick={toggleCnPasswordVisibility} />
                )}
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step2.confirmPassword.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <select
                id='preferedLanguage'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                name='preferedLanguage'
                value={formState.preferedLanguage}
                defaultValue='english'
                onChange={handleChange}
              >
                <option value='english'>English</option>
                <option value='german'>German</option>
                <option value='croatian'>Croatian</option>
              </select>
              <label
                htmlFor='preferedLanguage'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step2.preferedLanguage.placeholder')}
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>
                {t('step2.preferedLanguage.label')}
              </span>
            </p>
          </div>

          <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-between w-full'>
            <ButtonOutline label={t('backButton')} prevStep={gotoPrevStep} />
            <Button label={t('nextButton')} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpTwo;
