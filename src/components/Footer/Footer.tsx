"use client"
import { Button } from '@/components/Elements/Button';
import LangSwitcherFooter from '@/components/Header/LangSwitcherFooter';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/app/i18n/client';

export const Footer = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, 'footer');
  return (
    /* Additional styling */
    <footer className='dark-footer  dark:dark-footer text-[#fafafa] '>

      <div className="xl:container mx-auto px-4 py-7 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 text-center justify-evenly">
          <div className='lg:min-w-[629px]'>
            <div className="pb-7 md:text-start leading-8">
              <h3 className='text-[1.565rem]  text-[#1CCFB9]'>
                {t("newsletter.title")}
              </h3>
              <p className="text-[0.995rem] md:text-p2 pt-8 md:pt-0 md:font-medium text-center md:text-left"><span>{t("newsletter.subtext")}</span></p>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='relative md:flex-1'>
                <input
                  type='email'
                  id='email'
                  className='block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-neutral-50 rounded-xl border-1 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                  placeholder=' '
                  name='email'
                  // value={formState.email}
                  // onChange={handleChange}
                  style={{ padding: '16px' }}
                />
                <label
                  htmlFor='email'
                  className='absolute text-lg bg-transparent text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  {t("newsletter.placeholder")}
                </label>
              </div>
              <div className='flex-initial'>
                <button
                  type="submit"
                  className="cursor-pointer select-none  disabled:cursor-not-allowed disabled:opacity-75 disabled:pointer-events-none
                    duration-300 transition-all rounded-xl text-lg  px-9 py-3  sm:text-p1 sm:font-semibold text-neutral-900 border-2 border-transparent
                    bg-[#3bd6f0] shadow-md transition-all duration-500   w-full
                    hover:bg-gradient-to-br from-[#3bd6f0]   to-[#1fce1c]">
                  <span>{t("newsletter.button")}</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col md:flex-row md:gap-8 leading-8 md:justify-between lg:justify-center">
              <div className=" flex justify-around py-6 md:py-0 md:flex-col md:gap-1 items-start">
                <div className='flex-col space-y-4'>
                  <h4 className='text-inherit '>
                    <span>{t("languageTitle")}</span>

                  </h4>
                  <span className='text-md flex items-center justify-center'>
                    {/* <span>En</span>&nbsp; */}
                    <LangSwitcherFooter lang={lang} />

                  </span>
                </div>
                <div className='flex-col space-y-4'>
                  <h4 className='text-inherit '>
                    <span>{t("currencyTitle")}</span>
                  </h4>
                  <p className='text-sm flex items-center justify-center'>
                    <span>EUR</span>&nbsp;
                    <svg className="-mr-1 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </p>
                </div>
              </div>

              <div className='text-start hidden md:block'>
                <h4 className='text-[#1CCFB9]'><span>{t("suportText")}</span></h4>
                <div className=''>
                  <ul className=''>
                    <li><a href="#">{t("helpLink")}</a></li>
                    <li><a href="#">{t("contactLink")}</a></li>
                    <li><a href="#">{t("termsAndConditionsLink")}</a></li>
                    <li><a href="#">{t("privacyPolicyLink")}</a></li></ul>
                </div>
              </div>
              <div className='text-start hidden md:block'>

                <h4 className='text-[#1CCFB9]'><span>{t("companyText")}</span></h4>
                <div>
                  <ul className=''>
                    <li><a href="#">{t("aboutusLink")}</a></li>
                    <li><a href="#">{t("imprintLink")}</a></li>
                  </ul>
                </div>
              </div>
              <div className='text-start hidden md:block'>

                <h4 className='text-[#1CCFB9]'><span>{t("workWithUsText")}</span></h4>
                <div>
                  <ul className=''>
                    <li><a href="#">{t("supplierAdministrationLink")}</a></li>
                    <li><a href="/Supplier">{t("supplierRegistrationLink")}</a></li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="accordion md:hidden">
              <input type="checkbox" id="accordion-1" className="accordion-checkbox" />
              <label htmlFor="accordion-1" className="accordion-label flex items-center justify-between">
                {t("suportText")}
                <svg className="-mr-1 h-4 w-4 text-[#1CCFB9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /> </svg>
              </label>

              <div className="accordion-content">
                <div>
                  <ul className=''>
                    <li><a href="#">{t("helpLink")}</a></li>
                    <li><a href="#">{t("contactLink")}</a></li>
                    <li><a href="#">{t("termsAndConditionsLink")}</a></li>
                    <li><a href="#">{t("privacyPolicyLink")}</a></li></ul>
                </div>

              </div>

              <input type="checkbox" id="accordion-2" className="accordion-checkbox" />
              <label htmlFor="accordion-1" className="accordion-label flex items-center justify-between">
                {t("companyText")}
                <svg className="-mr-1 h-4 w-4 text-[#1CCFB9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /> </svg>
              </label>              <div className="accordion-content">
                <div>
                  <ul className=''>
                    <li><a href="#">{t("aboutusLink")}</a></li>
                    <li><a href="#">{t("imprintLink")}</a></li>
                  </ul>
                </div>

              </div>

              <input type="checkbox" id="accordion-3" className="accordion-checkbox" />
              <label htmlFor="accordion-1" className="accordion-label flex items-center justify-between">
                {t("workWithUsText")}
                <svg className="-mr-1 h-4 w-4 text-[#1CCFB9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /> </svg>
              </label>              <div className="accordion-content">
                <div>
                  <ul className=''>
                    <li><a href="#">{t("supplierAdministrationLink")}</a></li>
                    <li><a href="/Supplier">{t("supplierRegistrationLink")}</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>

        <div className="flex justify-center items-center  px-10 md:px-0 md:gap-6 pt-9 md:pt-20">
          <div></div><div className="flex-1 md:flex-initial"><p className="text-p4 md:text-p3"
          >
            <span>
              © 2024{' '}
              <a href='https://www.myholiday.guide/' className='hover:underline'>
                {t("siteName")}
              </a>
              . {t("alrightText")}
            </span>
          </p>
          </div></div>
      </div>

    </footer>
  );
};
