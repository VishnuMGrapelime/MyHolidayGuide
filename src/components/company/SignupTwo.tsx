import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

// Yup schema to validate the form
const schema = Yup.object().shape({
  companyName: Yup.string().required(),
  companyName2: Yup.string().required(),
  address1: Yup.string().required(),
  address2: Yup.string().required(),
  streetNumber: Yup.string().required(),
  postOffice: Yup.string().required(),
  zipCode: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
});

const SignUpTwo = ({ nextStep, prevStep, updateFormData }) => {
  const initialValues = {
    companyName: '',
    companyName2: '',
    address1: '',
    address2: '',
    streetNumber: '',
    postOffice: '',
    zipCode: '',
    city: '',
    country: '',
  };

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
          <h2 className='text-xl font-bold mb-6'>
            Step 1: Company information
          </h2>
          <div>
            <label
              htmlFor='companyName'
              className='block text-sm font-medium leading-6'
            >
              Company Name
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='companyName'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='companyName' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Company Name 2
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='companyName2'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='companyName2' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Address 1
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='address1'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='address1' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Address 2
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='address2'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='address2' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Street Number
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='streetNumber'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='streetNumber' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Post Office Box
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='postOffice'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='postOffice' component='div' />
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
