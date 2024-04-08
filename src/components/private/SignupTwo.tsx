import { ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import DynamicTabs from '@/components/DynamicTabs';
import { Button, ButtonOutline } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().email().required('Email is a required field'),
  phone: Yup.string().required('Phone is a required field'),
  personalWebsite: Yup.string().required(),
  password: Yup.string()
    .min(6)
    .max(24)
    .required('Password is a required field'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
  preferedLanguage: Yup.string().required(),
});

const SignUpTwo = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
  finalSubmit,
}) => {
  const [formState, setFormState] = useState({
    email: '',
    phone: '',
    personalWebsite: '',
    password: '',
    confirmPassword: '',
    preferedLanguage: 'english',
  });

  useEffect(() => {
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

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        const errorMessages = error.inner.reduce((acc, curr) => {
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
        <div className='m-12 p-12'>
          <div className='w-full  mx-auto text-center'>
            <h2 className='pb-6 md:pb-6 leading-6 text-h2 md:text-[2.25rem] font-bold'>
              <span>Additional information</span>
            </h2>
            <p className='text-p1 md:text-[1.3125rem] leading-6 font-bold'>
              <span>This person will be the administrator of the account.</span>
            </p>
            <p className='text-[1rem] leading-6 pt-2 md:pt-9'>
              <span>
                You can add additional users to your company after the
                registration.
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
                Email
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the e-mail address</span>
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
                Phone
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>The contact phone number</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='personalWebsite'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-[#1CCFB9] rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                name='personalWebsite'
                value={formState.personalWebsite}
                onChange={handleChange}
              />
              <label
                htmlFor='personalWebsite'
                className='absolute text-sm text-[#1CCFB9] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Website
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Your main domain on the web</span>
            </p>
          </div>
          <div>
            <div className='mt-2 '>
              <DynamicTabs tabs={tabs} setTabs={setTabs} />
            </div>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='password'
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
                Password
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter a password (6-24 characters)</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
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
                Password confirmation
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Confirm your password (6-24 characters)</span>
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
                Prefered language
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>
                This will be the user-interface language and that product input
                also occurs in the selected language.
              </span>
            </p>
          </div>

          <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-between w-full'>
            <ButtonOutline label='Back' prevStep={gotoPrevStep} />
            <Button label='Next' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpTwo;
