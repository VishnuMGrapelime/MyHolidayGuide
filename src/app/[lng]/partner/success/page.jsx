// pages/thank-you.js
import { LinkButton } from '@/components/Elements/Button';
import React from 'react';

const ThankYouPage = () => {
  return (
    <div className='container mx-auto p-4 dark:text-white'>

      <div className="h-[748px] flex items-center justify-center">
        <div class="text-center">
          <div class="flex flex-col justify-center items-center gap-8 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12 text-green-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h1 class="text-4xl font-bold ml-4">REGISTRATION COMPLETE</h1>
          </div>
          <p class="mb-2">Thank you for registering on MyHoliday Guide. You are almost done.</p>
          <p class="mb-6">Please check your email and click on the verification link to complete the registration process.</p>
          <LinkButton label={'Return to home'} link="/Supplier" />
        </div>
      </div>

    </div>
  );
};

export default ThankYouPage;
