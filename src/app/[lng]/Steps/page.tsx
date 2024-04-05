
"use client";
import { Datepicker } from 'flowbite-react';
import React, { useState } from 'react';
import Select from 'react-select';

function page() {
  // //   const [date, setDate] = useState(null);
  // const [focused, setFocused] = useState(false);

  // //  const handleDateChange = (newDate) => {
  // //     setDate(newDate);
  // //  };

  // const handleFocus = () => {
  //   setFocused(true);
  // };

  // const handleBlur = () => {
  //   // if (!date) {
  //   setFocused(false);
  //   // }
  // }
  const focused = true
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  return (
    <>
      <div className='space-y-1'>
        <div className="relative">
          <input
            type="date"
            id="existSince"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm
             text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          // onClick={handleDateChange}
          >

          </input>
          <label
            htmlFor="existSince"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Company exist since
          </label>
        </div>
        <p className='text- md:text- px-4 '>
          <span>How many employees does your company have</span>
        </p>
      </div>

      <div className="grid items-end w-3/4 mx-auto gap-6 mb-6 md:grid-cols-1">

        <div className="relative">
          <input
            type="date"
            id="default_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm
             text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          >

          </input>
          <label
            htmlFor="default_outlined"
            className="absolute text-sm text-vibrant-cyan dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Default outlined
          </label>
        </div>
        <div className="relative">
          <Datepicker
            id="existSince"
            style={{ backgroundColor: 'white' }}
            className="block px-2.5 pb-2.5 pt-4 w-full  text-sm text-gray-900 bg-transparent rounded-lg border-1 bg-white border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          />
          <label
            htmlFor="existSince"
            className="absolute top-[7px] bg-white  left-3.5  z-10 px-1 text-[11px] text-gray-500 dark:bg-gray-900  dark:border-gray-600  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Company exist since
          </label>
        </div>
      </div>
      <Datepicker
        className=''
      />

      <div>
        <label
          htmlFor='turnOver'
          className='block text-sm font-medium leading-6'
        >
          Company Gross turn over per year
        </label>
        <div className='mt-2'>
          <select
            // as='select'
            id='hey'
            name='turnOver'
            className='block w-3/4 mx-auto rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          // value={formState.turnOver}
          // onChange={handleChange}
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
      <div className="relative">
        <label
          className="absolute top-0 left-0 pointer-events-none px-1 transition-all origin-top-left text-xs text-gray-500"
          htmlFor={'hey'}   >
          {'her'}
        </label>
        <select
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value='300000-500000'></option>

          <option value='300000-500000'>300000-500000 EUR</option>
          <option value='500000-1000000'>500000-1000000 EUR</option>
        </select>
      </div>
      <div className="container mx-auto p-4">
        <div className="relative">
          <label
            className="absolute top-2 left-2 z-10 px-1 text-sm text-gray-500 bg-white dark:bg-gray-900 border border-gray-300 rounded-t-lg dark:border-gray-600 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            htmlFor="custom-select"
          >
            Select an option
          </label>
          <Select
            className="block w-full px-2.5 pb-2.5 pt-6 text-sm text-gray-900 bg-transparent rounded-b-lg border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="custom-select"
            options={options}
          />
        </div>
      </div>


    //////////////////

      <div className="p-4">
        <div className="relative">
          <label htmlFor="select" className={`absolute top-3 left-5 px-3 py-2 transition-all duration-200 ease-in-out transform origin-top ${true ? 'text-sm' : 'text-base'}`}>
            Select an option
          </label>
          <Select
            id="select"
            // value={selectedValue}
            // onChange={handleChange}
            options={options}
            className="w-full"
            classNamePrefix="select"
            placeholder="Select an option"
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: state.isFocused ? '1px solid #666' : '1px solid #ccc',
                boxShadow: state.isFocused ? '0 0 0 1px #666' : 'none',
                '&:hover': {
                  border: '1px solid #666',
                },
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#666',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#666',
              }),
            }}
          />
        </div>
      </div>
////////////////////////////


      <div className="container mx-auto p-4">
        <div className="relative">
          <label
            className="absolute top-3 left-5 z-10 px-1 text-[11px] text-gray-500 bg-white dark:bg-gray-900  dark:border-gray-600 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            htmlFor="businessType"
          >
            Company business types
          </label>
          <Select
            className="block w-full px-2.5 pb-2.5 pt-6 text-sm text-gray-900 bg-transparent rounded-b-lg border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="businessType"
            options={options}
            isMulti

            placeholder=""
            styles={{
              menu: provided => ({
                ...provided,
                borderRadius: '0 0 0.5rem 0.5rem', // Round bottom corners
                marginTop: '0', // Remove top margin
                boxShadow: 'none', // Remove shadow
                border: '1px solid #E5E7EB', // Add border
              }),
              option: provided => ({
                ...provided,
                padding: '0.5rem', // Add padding to options
              }),
              indicatorSeparator: (base) => ({
                display: 'none',
              }),

            }}
          />
        </div>
      </div>
    </>
  );
}


export default page;