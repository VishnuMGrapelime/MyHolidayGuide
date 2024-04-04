import { useField } from 'formik';
import React from 'react';

const DateSelector = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='w-full'>
      <label
        htmlFor={props.id || props.name}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        type='date'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Select date'
      />
      {meta.touched && meta.error ? (
        <div className='mt-2 text-sm text-red-600'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DateSelector;
