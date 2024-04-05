import { ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';

const schema = Yup.object().shape({
  personalIdNo: Yup.string().required(
    'Company identification no is a required field',
  ),
  firstName: Yup.string().required('First name is a required field'),
  lastName: Yup.string().required('Last name is a required field'),
  address1: Yup.string().required('Address1 is a required field'),
  address2: Yup.string().required('Address2 is a required field'),
  street: Yup.string().required('Street is a required field'),
  streetNumber: Yup.string().required('Street number is a required field'),
  postOffice: Yup.string().required('Post Office is a required field'),
  zipCode: Yup.string().required('Zipcode is a required field'),
  city: Yup.string().required('City is a required field'),
  country: Yup.string().required('Country is a required field'),
});

const SignupOne = ({ nextStep, formData, updateFormData }) => {
  const [formState, setFormState] = useState({
    personalIdNo: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    street: '',
    streetNumber: '',
    postOffice: '',
    zipCode: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    if (formData) {
      setFormState({
        personalIdNo: formData.personalIdNo,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address1,
        address2: formData.address2,
        street: formData.street,
        streetNumber: formData.streetNumber,
        postOffice: formData.postOffice,
        zipCode: formData.zipCode,
        city: formData.city,
        country: formData.country,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const [errors, setErrors] = useState({
    personalIdNo: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    street: '',
    streetNumber: '',
    postOffice: '',
    zipCode: '',
    city: '',
    country: '',
  });

  const [errorStatus, setErrorStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorStatus(false);
    try {
      // Validate the form data
      console.log(formState);
      await schema.validate(formState, { abortEarly: false });

      console.log('Form is valid', formState);
      updateFormData(formState);
      nextStep();
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

  return (
    <div>
      <div className='m-12 p-12'>
        <div className='w-full  mx-auto text-center'>
          <h2 className='pb-6 md:pb-6 leading-6 text-h2 md:text-[2.25rem] font-bold'>
            <span>Personal information</span>
          </h2>
          <p className='text-p1 md:text-[1.3125rem] leading-6 font-bold'>
            <span>Please be a as precise as possible</span>
          </p>
          <p className='text-[1rem] leading-6 pt-2 md:pt-9'>
            <span>
              Some basic information about your self, for receipts, contact etc.
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
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='personalIdNo'
                value={formState.personalIdNo}
                onChange={handleChange}
              />
              <label
                htmlFor='default_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Personal Identification no.
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter your personal identification no</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='firstName'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='firstName'
                value={formState.firstName}
                onChange={handleChange}
              />
              <label
                htmlFor='firstName'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                First name
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the first name </span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='lastName'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='lastName'
                value={formState.lastName}
                onChange={handleChange}
              />
              <label
                htmlFor='lastName'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Last name
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the last name </span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='address1'
                value={formState.address1}
                onChange={handleChange}
              />
              <label
                htmlFor='address1'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Address 1
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the street address</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='default_outlined'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='address2'
                value={formState.address2}
                onChange={handleChange}
              />
              <label
                htmlFor='address2'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Address 2
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the address2</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='street'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='street'
                value={formState.street}
                onChange={handleChange}
              />
              <label
                htmlFor='street'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Street
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the street</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='streetNumber'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='streetNumber'
                value={formState.streetNumber}
                onChange={handleChange}
              />
              <label
                htmlFor='streetNumber'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Street Number
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the street number</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='postOffice'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='postOffice'
                value={formState.postOffice}
                onChange={handleChange}
              />
              <label
                htmlFor='postOffice'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Post Office Box
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>(optional) Please enter your post office box number</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='zipCode'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='zipCode'
                value={formState.zipCode}
                onChange={handleChange}
              />
              <label
                htmlFor='zipCode'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Zip Code
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the zip code</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='city'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='city'
                value={formState.city}
                onChange={handleChange}
              />
              <label
                htmlFor='city'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                City
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the city </span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='country'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='country'
                value={formState.country}
                onChange={handleChange}
              />
              <label
                htmlFor='country'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                Country
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>Please enter the country</span>
            </p>
          </div>
          <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-center w-full'>
            {/* <ButtonOutline label='Back' /> */}
            <Button label='Next' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupOne;
