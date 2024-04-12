// pages/thank-you.js
import { LinkButton } from '@/components/Elements/Button';
import React from 'react';

const ThankYouPage = () => {
  return (
    <div className='container mx-auto p-4 dark:text-white'>

      <div className="h-[748px] flex items-center justify-center">
        <div class="text-center">
          <div class="flex flex-col justify-center items-center gap-8 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#1CCFB9" viewBox="0 0 24 24" width="70" height="70">
              <circle cx="12" cy="12" r="11" fill="green" />
              <path fill="white" d="M9.172 17.172a1 1 0 0 1-1.414 0L4.95 13.95a1 1 0 0 1 1.414-1.414L9 15.586l7.636-7.636a1 1 0 0 1 1.414 1.414l-8.5 8.5a1 1 0 0 1-1.414 0z" />
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
