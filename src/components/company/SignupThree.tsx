import { Datepicker } from 'flowbite-react';
import { ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import * as Yup from 'yup';

import DynamicTabs from '@/components/DynamicTabs';
import { Button, ButtonOutline } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';

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
const customStyles = {
  menu: (provided) => ({
    ...provided,
    borderRadius: '0 0 0.5rem 0.5rem', // Round bottom corners
    marginTop: '0', // Remove top margin
    boxShadow: 'none', // Remove shadow
    border: '1px solid #E5E7EB', // Add border
  }),
  option: (provided) => ({
    ...provided,
    // padding: '0.5rem', // Add padding to options
  }),
  indicatorSeparator: (base) => ({
    display: 'none',
  }),
  control: (base, state) => ({
    ...base,
    padding: '5px',
    border: '1px 1CCFB9'
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#666', // Change this to your desired color
    padding: '0',
  }),
};

const SignUpThree = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
  finalSubmit,
}) => {
  const [formState, setFormState] = useState({
    companyWebsite: 'https://',
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

  const [errorStatus, setErrorStatus] = useState(false);

  const [tabs, setTabs] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (formData) {
      setFormState({
        companyWebsite: formData.companyWebsite,
        employeeCount: formData.employeeCount,
        turnOver: formData.turnOver,
        companyLanguage: formData.companyLanguage,
        acceptTerms: formData.acceptTerms,
      });
      console.log(formData.selectedOption);
      setSelectedOption(formData.selectedOption);
      setSelectedDate(formData.existSince);
      if (formData.socialTabs) {
        setTabs(formData.socialTabs);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorStatus(false);

    try {
      // Validate the form data

      const businessType = [];
      // console.log(typeof selectedOption !== 'undefined');
      // console.log(selectedOption.length);
      if (typeof selectedOption !== 'undefined') {
        //if (selectedOption.length > 0) {
        selectedOption.map((item) => {
          businessType.push(item.value);
        });
        setFormState({ ...formState, compBusinessType: businessType });
      }

      console.log('working 1');
      const socialData = [];
      if (tabs.length > 0) {
        tabs.map((item) => {
          //console.log(item);
          socialData.push(item.values);
        });

        setFormState({ ...formState, socialUrl: socialData });
      }

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

  const setTermsAndConditions = (value) => {
    setFormState({ ...formState, acceptTerms: value });
  };

  const handleDateChange = (date) => {
    const givenDateTime = new Date(date);

    // Convert the Date object to a date string
    const formattedDate = `${givenDateTime.getDate().toString().padStart(2, '0')}/${(givenDateTime.getMonth() + 1).toString().padStart(2, '0')}/${givenDateTime.getFullYear()}`;

    setFormState({ ...formState, existSince: formattedDate });
    // console.log(formState);

    setSelectedDate(date);
  };

  const handleBusinessTypeChange = (value) => {
    setSelectedOption(value);
    setFormState({ ...formState, selectedOption: value });
  };

  const gotoPrevStep = () => {
    // setFormState({ ...formState, socialTabs: tabs });
    if (tabs) {
      updateFormData({ ...formState, socialTabs: tabs });
    } else {
      updateFormData(formState);
    }

    console.log(formState);
    prevStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='m-12 p-12'>

          <div className='w-full  mx-auto text-center'>
            <h2 className='pb-6 md:pb-6 leading-6 text-h2 md:text-[2.25rem] font-bold'>
              <span>Company information</span>
            </h2>
            <p className='text-p1 md:text-[1.3125rem] leading-6 font-bold'>
              <span>Please be a as precise as possible</span>
            </p>
            <p className='text-[1rem] leading-6 pt-2 md:pt-9'>
              <span>
                Some basic information about your company, for receipts, contact
                etc.
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
                id='companyWebsite'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                name='companyWebsite'
                value={formState.companyWebsite}
                onChange={handleChange}
              />
              <label
                htmlFor='companyWebsite'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Company Website
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
            <DynamicTabs tabs={tabs} setTabs={setTabs} />
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='employeeCount'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                name='employeeCount'
                value={formState.employeeCount}
                onChange={handleChange}
              />
              <label
                htmlFor='employeeCount'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Company employee count
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter your company name</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className="relative">
              <Datepicker
                id="existSince"
                onSelectedDateChanged={handleDateChange}
                style={{ backgroundColor: 'white' }}
                className="block  pt-7 w-full  text-sm text-gray-900 bg-transparent rounded-lg border-1 bg-white border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              />
              <label
                htmlFor="existSince"
                className="absolute top-[17px] bg-white  left-[5px]  z-10 px-1 text-[11px] text-gray-500 dark:bg-gray-900  dark:border-gray-600 peer-focus:text-blue-600  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Company exist since
              </label>
              <p className='text- md:text-px mb-4' style={{ paddingLeft: '1rem' }}>
                <span>Please enter your company name exist since</span>
              </p>
            </div>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <select
                id='turnOver'
                className='block px-2.5   pb-2.5 pt-3 w-full text-sm 
              text-gray-900 bg-transparent rounded-lg 
              border-1 border-gray-300 appearance-none dark:text-white
              dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
               focus:ring-0 focus:border-blue-600 peer'
                name='turnOver'
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
              <label
                htmlFor='turnOver'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Company Gross turn over per year
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter your company name gross turn over</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className="relative">
              <label
                className="absolute top-3 left-[5px] z-10 px-1 text-[11px] text-gray-500 bg-white dark:bg-gray-900  dark:border-gray-600 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                htmlFor="businessType"
              >
                Company business types
              </label>
              <Select
                className="block w-full   pt-6 text-sm text-gray-900 bg-transparent rounded-b-lg border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer"
                id="businessType"
                options={options}
                isMulti
                defaultValue={selectedOption}
                onChange={handleBusinessTypeChange}
                placeholder=""
                styles={customStyles}
              />
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter your company name gross turn over</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <select
                id='companyLanguage'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                name='companyName'
                value={formState.companyLanguage}
                onChange={handleChange}
              >
                <option value='english'>English</option>
                <option value='german'>German</option>
                <option value='croatian'>Croatian</option>
              </select>
              <label
                htmlFor='companyLanguage'
                className='absolute z-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Company language
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter your company name</span>
            </p>
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
        <div className='py-6 px-4 flex flex-col gap-y-6 md:gap-x-20  justify-center items-center w-full mx-auto'>
          <ButtonOutline label='Back' prevStep={gotoPrevStep} />
          <Button label='Send' />
        </div>
      </form>
    </>

  );
};

export default SignUpThree;
