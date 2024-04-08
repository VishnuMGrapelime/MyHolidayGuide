import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <footer className='bg-[#0f1b38]   dark:bg-[#0f1b38] text-[#fafafa]'>
      <div className='container mx-auto'>
        <div className='py-6 text-center md:flex md:items-center md:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2024{' '}
            <a href='https://www.myholiday.guide/' className='hover:underline'>
              MyHoliday Guide™
            </a>
            . All Rights Reserved.
          </span>
          <ul className='flex md:flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
            <li>
              {/* <a href='#' className='hover:underline me-4 md:me-6'>
                About
              </a> */}
              <Link href='/Supplier' className='hover:underline me-4 md:me-6'>
                Supplier Registration
              </Link>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
