import { Datepicker } from 'flowbite-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import * as Yup from 'yup';

// import { Datepicker } from "flowbite-react";
// import DateSelector from '@/components/MultiselectComponent';

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

const options = [
  { value: 'activities', label: 'Activities' },
  { value: 'boatsyachts', label: 'Boats & Yachts' },
  { value: 'transfers', label: 'Transfers' },
];

const SignUpThree = ({ nextStep, prevStep, formData, updateFormData }) => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  const [selectedOption, setSelectedOption] = useState(null);

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
          <h2 className='text-xl font-bold mb-6'>Additional Information</h2>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Company Website
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='companyWebsite'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='companyWebsite' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='employeeCount'
              className='block text-sm font-medium leading-6'
            >
              Company employee count
            </label>
            <div className='mt-2'>
              <Field
                type='text'
                name='employeeCount'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
              <ErrorMessage name='employeeCount' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='existSince'
              className='block text-sm font-medium leading-6'
            >
              Company exist since
            </label>
            <div className='mt-2'>
              {/* <Field
                type='text'
                name='existSince'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              /> */}

              <div className='relative max-w-sm cedatepicker'>
                {/* <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                  </svg>
                </div> */}

                <Datepicker />
              </div>
              <ErrorMessage name='existSince' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='turnOver'
              className='block text-sm font-medium leading-6'
            >
              Company Gross turn over per year
            </label>
            <div className='mt-2'>
              <Field
                as='select'
                name='turnOver'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              >
                <option value='no'>----</option>
                <option value='0-50000'>0-50000 EUR</option>
                <option value='50000-100000'>50000-100000 EUR</option>
                <option value='100000-300000'>100000-300000 EUR</option>
                <option value='300000-500000'>300000-500000 EUR</option>
                <option value='500000-1000000'>500000-1000000 EUR</option>
                <option value='1000000+'>1000000+ EUR</option>
              </Field>
              <ErrorMessage name='turnOver' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='businessType'
              className='block text-sm font-medium leading-6'
            >
              Company business types
            </label>
            <div className='mt-2'>
              {/* <Field
                type='text'
                name='businessType'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              /> */}

              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
              />

              {/* <DateSelector label='Select Date' name='date' /> */}
              <ErrorMessage name='businessType' component='div' />
            </div>
          </div>

          <div>
            <label
              htmlFor='companyLanguage'
              className='block text-sm font-medium leading-6'
            >
              Company language
            </label>
            <div className='mt-2'>
              <Field
                as='select'
                name='companyLanguage'
                className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              >
                <option value='english'>English</option>
                <option value='german'>German</option>
                <option value='croatian'>Croatian</option>
              </Field>
              <ErrorMessage name='companyLanguage' component='div' />
            </div>
          </div>

          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={prevStep}
          >
            Back
          </button>

          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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

export default SignUpThree;
