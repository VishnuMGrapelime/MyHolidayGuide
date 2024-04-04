import { Datepicker } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import * as Yup from 'yup';

import DynamicTabs from '@/components/DynamicTabs';

// Yup schema to validate the form
const schema = Yup.object().shape({
  companyWebsite: Yup.string().required(),
  employeeCount: Yup.string().required(),
  turnOver: Yup.string().required(),
  companyLanguage: Yup.string().required(),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

const options = [
  { value: 'activities', label: 'Activities' },
  { value: 'boatsyachts', label: 'Boats & Yachts' },
  { value: 'transfers', label: 'Transfers' },
];

const SignUpThree = ({ nextStep, prevStep, formData, updateFormData }) => {
  const [formState, setFormState] = useState({
    companyWebsite: '',
    employeeCount: '',
    turnOver: '',
    companyLanguage: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    companyWebsite: '',
    employeeCount: '',
    turnOver: '',
    companyLanguage: '',
    acceptTerms: '',
  });

  const [tabs, setTabs] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (formData) {
      setFormState({
        companyWebsite: formData.companyWebsite,
        employeeCount: formData.employeeCount,
        turnOver: formData.turnOver,
        companyLanguage: formData.companyLanguage,
        acceptTerms: formData.acceptTerms,
      });
      setSelectedOption(formData.compBusinessType);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data

      const businessType = [];
      console.log(selectedOption);

      if (selectedOption.length > 0) {
        selectedOption.map((item) => {
          businessType.push(item.value);
        });
      }
      setFormState({ ...formState, compBusinessType: businessType });

      const socialData = [];
      if (tabs.length > 0) {
        tabs.map((item) => {
          //console.log(item);
          socialData.push(item.values);
        });

        setFormState({ ...formState, socialUrl: socialData });
      }

      console.log(businessType);
      await schema.validate(formState, { abortEarly: false });

      console.log('Form is valid', formState);
      updateFormData(formState);
    } catch (error) {
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

  const setTermsAndConditions = (value) => {
    setFormState({ ...formState, acceptTerms: value });
  };

  const handleDateChange = (date) => {
    const givenDateTime = new Date(date);

    // Convert the Date object to a date string
    const formattedDate = `${givenDateTime.getDate().toString().padStart(2, '0')}/${(givenDateTime.getMonth() + 1).toString().padStart(2, '0')}/${givenDateTime.getFullYear()}`;

    setFormState({ ...formState, existSince: formattedDate });
    // console.log(formState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className='text-xl font-bold mb-6'>Additional Information</h2>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6'
          >
            Company Website
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='companyWebsite'
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              value={formState.companyWebsite}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div className='mt-2'>
            <DynamicTabs tabs={tabs} setTabs={setTabs} />
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
            <input
              type='text'
              name='employeeCount'
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              value={formState.employeeCount}
              onChange={handleChange}
            />
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
              <Datepicker onSelectedDateChanged={handleDateChange} />
            </div>
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
            <select
              as='select'
              name='turnOver'
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              value={formState.turnOver}
              onChange={handleChange}
            >
              <option value='no'>----</option>
              <option value='0-50000'>0-50000 EUR</option>
              <option value='50000-100000'>50000-100000 EUR</option>
              <option value='100000-300000'>100000-300000 EUR</option>
              <option value='300000-500000'>300000-500000 EUR</option>
              <option value='500000-1000000'>500000-1000000 EUR</option>
              <option value='1000000+'>1000000+ EUR</option>
            </select>
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
            <select
              as='select'
              name='companyLanguage'
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              value={formState.companyLanguage}
              onChange={handleChange}
            >
              <option value='english'>English</option>
              <option value='german'>German</option>
              <option value='croatian'>Croatian</option>
            </select>
          </div>
        </div>

        <div className='flex items-start mb-5'>
          <div className='flex items-center h-5'>
            <input
              id='terms'
              type='checkbox'
              name='acceptTerms'
              checked={formState.acceptTerms}
              onChange={(e) => setTermsAndConditions(e.target.checked)}
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
            />
          </div>
          <label
            htmlFor='acceptTerms'
            className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            I have read and accept the{' '}
            <a
              href='#'
              className='text-blue-600 hover:underline dark:text-blue-500'
            >
              terms and conditions
            </a>
          </label>
        </div>

        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={prevStep}
        >
          Back
        </button>

        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          // onClick={checkData}
          type='submit'
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SignUpThree;
