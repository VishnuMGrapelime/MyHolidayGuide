// pages/thank-you.js
import { Button } from '@/components/Elements/Button';
import React from 'react';

const ThankYouPage = () =>
{
  return (
    <div className='container mx-auto p-4 dark:text-white'>

      <div className="h-[748px] flex items-center justify-center">
        <div class="text-center">
          <div class="flex flex-col justify-center items-center gap-8 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12 text-green-500">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h1 class="text-4xl font-bold ml-4">REGISTRATION COMPLETE</h1>
          </div>
          <p class="mb-2">Thank you for registering on cargoo. You are almost done.</p>
          <p class="mb-6">Please note that your organization administrator will also need to approve your registration for you to use all available functionalities in cargoo.</p>
          <Button label={'Return to home'} />
        </div>
      </div>

    </div>
  );
};

export default ThankYouPage;
