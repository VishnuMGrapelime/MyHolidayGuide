import { Button, ButtonOutline } from '@/components/Elements/Button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ClipboardCheck } from 'lucide-react';
import React, { useState } from 'react';
import * as Yup from 'yup';

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(24).required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
  phone: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

const SignUpTwo = ({ nextStep, prevStep, formData, updateFormData }) => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  useState(() => {
    if (formData) {
      setInitialValues(formData);
    }

    console.log(formData);
  }, []);

  const onSubmit = (values) => {
    console.log(values);
    updateFormData(values);
    nextStep();
  };

  return (
    <div>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <Form>
          <h2 className='text-xl font-bold mb-6'>Company owner information</h2>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Email
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
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6'
            >
              Password
            </label>
            <div className='mt-2'>
              <Field
                type='password'
                name='password'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='password' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium leading-6'
            >
              Confirm Password
            </label>
            <div className='mt-2'>
              <Field
                type='password'
                name='confirmPassword'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='confirmPassword' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='phone'
              className='block text-sm font-medium leading-6'
            >
              Phone
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='phone'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='phone' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='firstName'
              className='block text-sm font-medium leading-6'
            >
              First Name
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='firstName'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='firstName' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='lastName'
              className='block text-sm font-medium leading-6'
            >
              Last Name
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='lastName'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='lastName' component='div' />
            </div>
          </div>

          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={prevStep}
          >
            Back
          </button>

          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            // onClick={nextStep}
            type='submit'
          >
            Next
          </button>
        </Form>
      </Formik> */}
      <div className='m-12 p-12'>
        <div className='w-full  mx-auto text-center'>
          <h2 className="pb-6 md:pb-6 leading-6 text-h2 md:text-[2.25rem] font-bold"><span>Company owner information</span></h2>
          <p className="text-p1 md:text-[1.3125rem] leading-6 font-bold"><span>This person will be the administrator of the account.</span></p>
          <p className="text-[1rem] leading-6 pt-2 md:pt-9"><span>You can add additional users to your company after the registration.</span></p>
        </div>
      </div>
      <div className="grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1">
        <div className='space-y-1'>
          <div className="relative ">
            <input
              type="text"
              id="default_outlined"
              className="block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="default_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Company Name
            </label>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ClipboardCheck color='#1CCFB9' />
            </div>
          </div>
          <p className="text- md:text- px-4 ">
            <span>Please enter your company name</span></p>
        </div>

        <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-center w-full'>
          <ButtonOutline label={'Back'} />
          <Button label={'Next'} />
        </div>
      </div>
    </div>
  );
};

export default SignUpTwo;
