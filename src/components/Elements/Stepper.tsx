import React from 'react'
import { useTranslation } from '@/app/i18n/client';

export default function Stepper({ currPage, lang }: { currPage: any, lang: string }) {
  const { t } = useTranslation(lang, 'companyRegistration-page');
  return (
    <>
      <div className='mb-12'>
        <ul className="flex  justify-center text-center stepIcon md:whitespace-nowrap dark:text-white">
          <li className="flex w-full ml-16 md:ml-44 items-center text-black dark:text-white after:content-[''] after:mx-1 after:w-full after:h-1 after:border-b after:border-[#1CCFB9] after:border-1 after:inline-block dark:after:border-[#1CCFB9]">
            <span className={`relative flex flex-col items-center justify-center w-10 h-10 border-[1px] border-black ${currPage <= 3 ? 'stepper' : ''} rounded-full lg:h-12 lg:w-12  shrink-0`}>
              1
              <span className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 step-text">
                {t('step1Text')}
              </span>
            </span>
          </li>
          <li className="flex w-full items-center after:content-[''] after:mx-1 after:w-full after:h-1 after:border-b after:border-[#1CCFB9] after:border-1 after:inline-block dark:after:bg-transparent">
            <span className={`flex relative items-center justify-center w-10 h-10 border-[1px] dark:border-white border-black ${currPage === 2 || (currPage >= 2 && currPage <= 3) ? 'stepper' : ''} rounded-full lg:h-12 lg:w-12 dark:bg-transparent shrink-0`}>
              2
              <span className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 step-text">
                {t('step2Text')}
              </span>
            </span>
          </li>
          <li className="flex items-center w-full">
            <span className={`flex relative items-center justify-center w-10 h-10 border-[1px] dark:border-white  border-black ${currPage == 3 ? 'stepper' : ''} rounded-full lg:h-12 lg:w-12 dark:bg-transparent shrink-0`}>
              3
              <span className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 step-text">
                {t('step3Text')}
              </span>
            </span>
          </li>
        </ul>
      </div >
    </>
  )
}

