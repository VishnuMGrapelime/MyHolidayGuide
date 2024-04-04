import { ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/Elements/Button';

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

const SignupOne = ({ nextStep, formData, updateFormData }) => {
  const [formState, setFormState] = useState({
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
    if (formData) {
      setFormState({
        companyName: formData.companyName,
        companyName2: formData.companyName2,
        address1: formData.address1,
        address2: formData.address2,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data
      console.log(formState);
      await schema.validate(formState, { abortEarly: false });

      console.log('Form is valid', formState);
      updateFormData(formState);
      nextStep();
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

  const [initialValues, setInitialValues] = useState({
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

  useState(() => {
    if (formData) {
      setInitialValues(formData);
    }

    console.log(formData);
  }, []);

  // const initialValues = {
  //   companyName: '',
  //   companyName2: '',
  //   address1: '',
  //   address2: '',
  //   streetNumber: '',
  //   postOffice: '',
  //   zipCode: '',
  //   city: '',
  //   country: '',
  // };

  const onSubmit = (values) => {
    console.log(values);
    updateFormData(values);
  };

  return (
    <div>
      <div className='m-12 p-12'>
        <div className='w-1/4 mx-auto '>
          <h2 className='pb-6 md:pb-3 text-h2 md:text-h1 font-bold'>
            <span>Company information</span>
          </h2>
        </div>
      </div>
      {initialValues && (
        // <Formik
        //   initialValues={initialValues}
        //   validationSchema={schema}
        //   onSubmit={onSubmit}
        // >
        //   <Form>
        //     <h2 className='text-xl font-bold mb-6'>
        //       Step 1: Company information
        //     </h2>
        //     <div>
        //       <label
        //         htmlFor='companyName'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Company Name
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='companyName'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='companyName' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='companyName2'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Company Name 2
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='companyName2'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='companyName2' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='address1'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Address 1
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='address1'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='address1' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='address2'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Address 2
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='address2'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='address2' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='streetNumber'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Street Number
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='streetNumber'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='streetNumber' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='postOffice'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Post Office Box
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='postOffice'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='postOffice' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='zipCode'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Zip Code
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='zipCode'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='zipCode' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='city'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         City
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='city'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='city' component='div' />
        //       </div>
        //     </div>

        //     <div>
        //       <label
        //         htmlFor='country'
        //         className='block text-sm font-medium leading-6'
        //       >
        //         Country
        //       </label>
        //       <div className='mt-2'>
        //         <Field
        //           type='text'
        //           name='country'
        //           className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        //         />
        //         <ErrorMessage name='country' component='div' />
        //       </div>
        //     </div>

        //     <button
        //       className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        //       // onClick={nextStep}
        //       type='submit'
        //     >
        //       Next
        //     </button>
        //   </Form>
        // </Formik>

        <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
          <form onSubmit={handleSubmit}>
            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='default_outlined'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='companyName'
                  value={formState.companyName}
                  onChange={handleChange}
                />
                <label
                  htmlFor='default_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Company Name
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>Please enter your company name</span>
              </p>
            </div>

            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='default_outlined'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='companyName2'
                  value={formState.companyName2}
                  onChange={handleChange}
                />
                <label
                  htmlFor='default_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Company Name 2
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>Please enter your company name</span>
              </p>
            </div>

            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='default_outlined'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='address1'
                  value={formState.address1}
                  onChange={handleChange}
                />
                <label
                  htmlFor='address1'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Address 1
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>
                  Please enter the street address of your company headquarters
                </span>
              </p>
            </div>

            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='default_outlined'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='address2'
                  value={formState.address2}
                  onChange={handleChange}
                />
                <label
                  htmlFor='address2'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Address 2
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>
                  Please enter the street address of your company headquarters
                </span>
              </p>
            </div>
            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='streetNumber'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='streetNumber'
                  value={formState.streetNumber}
                  onChange={handleChange}
                />
                <label
                  htmlFor='streetNumber'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Street Number
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>
                  Please enter the street address of your company headquarters
                </span>
              </p>
            </div>
            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='postOffice'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='postOffice'
                  value={formState.postOffice}
                  onChange={handleChange}
                />
                <label
                  htmlFor='postOffice'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Post Office Box
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>
                  (optional) Please enter your post office box number of your
                  organisation{' '}
                </span>
              </p>
            </div>
            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='zipCode'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='zipCode'
                  value={formState.zipCode}
                  onChange={handleChange}
                />
                <label
                  htmlFor='zipCode'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Zip Code
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>
                  Please enter the zip code of your company headquarters{' '}
                </span>
              </p>
            </div>
            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='city'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='city'
                  value={formState.city}
                  onChange={handleChange}
                />
                <label
                  htmlFor='city'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  City
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>Please enter the city of your company headquarters </span>
              </p>
            </div>
            <div className='space-y-1'>
              <div className='relative '>
                <input
                  type='text'
                  id='country'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  name='country'
                  value={formState.country}
                  onChange={handleChange}
                />
                <label
                  htmlFor='country'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Country
                </label>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ClipboardCheck color='#1CCFB9' />
                </div>
              </div>
              <p className='text- md:text- px-4 '>
                <span>
                  Please enter the country of your company headquarters{' '}
                </span>
              </p>
            </div>
            <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-center w-full'>
              {/* <ButtonOutline label='Back' /> */}
              <Button label='Next' />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupOne;
