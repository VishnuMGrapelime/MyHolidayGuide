import { ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';
import { useTranslation } from '@/app/i18n/client';



const SignupOne = ({ nextStep, formData, updateFormData, lang }: { nextStep: any, formData: any, updateFormData: any, lang: any }) => {
  const { t } = useTranslation(lang, 'companyRegistration-page');

  // Yup schema to validate the form
  const schema = Yup.object().shape({
    companyIdNo: Yup.string().required(t('step1.companyIdNo.validation')),
    companyName: Yup.string().required(t('step1.companyName.validation')),
    address1: Yup.string().required(t('step1.address1.validation')),
    address2: Yup.string().required(t('step1.address2.validation')),
    streetNumber: Yup.string().required(t('step1.streetNumber.validation')),
    zipCode: Yup.string().required(t('step1.zipCode.validation')),
    city: Yup.string().required(t('step1.city.validation')),
    country: Yup.string().required(t('step1.country.validation')),
  });

  const [formState, setFormState] = useState({
    companyIdNo: '',
    companyName: '',
    companyName2: '',
    address1: '',
    address2: '',
    streetNumber: '',
    postOffice: '',
    zipCode: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0)
    if (formData) {
      setFormState({
        companyIdNo: formData.companyIdNo,
        companyName: formData.companyName,
        companyName2: (formData.companyName2) ? formData.companyName2 : "",
        address1: formData.address1,
        address2: formData.address2,
        streetNumber: formData.streetNumber,
        postOffice: (formData.postOffice) ? formData.postOffice : "",
        zipCode: formData.zipCode,
        city: formData.city,
        country: formData.country,
      });
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const [errors, setErrors] = useState({
    companyIdNo: '',
    companyName: '',
    companyName2: '',
    address1: '',
    address2: '',
    streetNumber: '',
    postOffice: '',
    zipCode: '',
    city: '',
    country: '',
  });

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
      updateFormData(formState);
      nextStep();
    } catch (error) {
      focus: outline - none
      focus: outline - none
      focus: outline - none
      focus: outline - none
      focus: outline - none
      focus: outline - none
      focus: outline - none
      focus: outline - none
      focus: outline - none
      focus: outline - none
      setErrorStatus(true);
      if (error instanceof Yup.ValidationError) {
        // Update the errors state with the validation errors
        const errorMessages: any = error.inner.reduce((acc: any, curr: any) => {
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
      <div className='py-6 md:m-12 md:p-12 label'>
        <div className='w-full  mx-auto  md:text-center'>
          <h2 className='pb-6 md:pb-6 md:leading-6 text-h2 md:text-[2.35rem] font-bold  whitespace-nowrap'>
            <span>{t('step1Text')}</span>
          </h2>
          <p className='text-p1 md:text-[1.3125rem] leading-6 font-bold  md:whitespace-nowrap'>
            <span>{t('step1.subtext1')}</span>
          </p>
          <p className='text-[1rem] leading-6 pt-2 md:pt-9'>
            <span>
              {t('step1.subtext2')}
            </span>
          </p>
        </div>
      </div>
      {errorStatus && <ValidationBox errors={errors} />}

      <form onSubmit={handleSubmit}>
        <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='companyIdNo'
                value={formState.companyIdNo}
                onChange={handleChange}
              />
              <label
                htmlFor='default_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.companyIdNo.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label '>
              <span>{t('step1.companyIdNo.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='companyName'
                value={formState.companyName}
                onChange={handleChange}
              />
              <label
                htmlFor='default_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.companyName.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>{t('step1.companyName.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='companyName2'
                value={formState.companyName2}
                onChange={handleChange}
              />
              <label
                htmlFor='default_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.companyName2.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>{t('step1.companyName2.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='address1'
                value={formState.address1}
                onChange={handleChange}
              />
              <label
                htmlFor='address1'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.address1.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>
                {t('step1.address1.label')}
              </span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='address2'
                value={formState.address2}
                onChange={handleChange}
              />
              <label
                htmlFor='address2'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.address2.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>
                {t('step1.address2.label')}
              </span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='streetNumber'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='streetNumber'
                value={formState.streetNumber}
                onChange={handleChange}
              />
              <label
                htmlFor='streetNumber'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.streetNumber.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>
                {t('step1.streetNumber.label')}
              </span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='postOffice'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='postOffice'
                value={formState.postOffice}
                onChange={handleChange}
              />
              <label
                htmlFor='postOffice'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.postOffice.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>
                {t('step1.postOffice.label')}
              </span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='zipCode'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='zipCode'
                value={formState.zipCode}
                onChange={handleChange}
              />
              <label
                htmlFor='zipCode'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.zipCode.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>
                {t('step1.zipCode.label')}
              </span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='city'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='city'
                value={formState.city}
                onChange={handleChange}
              />
              <label
                htmlFor='city'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.city.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>{t('step1.city.label')} </span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='country'
                className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='country'
                value={formState.country}
                onChange={handleChange}
              />
              <label
                htmlFor='country'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step1.country.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 label'>
              <span>
                {t('step1.country.label')}
              </span>
            </p>
          </div>
          <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-end w-full'>
            {/* <ButtonOutline label='Back' /> */}
            <Button label={t('nextButton')} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupOne;
