import { ErrorMessage, Field, Form, Formik } from 'formik';
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
      <Formik
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
      </Formik>
    </div>
  );
};

export default SignUpTwo;
