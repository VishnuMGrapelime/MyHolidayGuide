import React from 'react'

export default function Stepper({ currPage })
{
  return (
    <>
      <div className='mb-12 '>
        <ul className="flex  justify-center stepIcon md:whitespace-nowrap">
          <li className="flex w-full ml-5 md:ml-44 items-center text-black dark:text-blue-500 after:content-[''] after:mx-1 after:w-full after:h-1 after:border-b after:border-[#1CCFB9] after:border-1 after:inline-block dark:after:border-blue-800">
            <span className={`relative flex flex-col items-center justify-center w-10 h-10 border-solid border-black ${currPage == 1 ? 'stepper' : ''} rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}>
              1
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 step-text">
                Company information
              </span>
            </span>
          </li>
          <li className="flex w-full items-center after:content-[''] after:mx-1 after:w-full after:h-1 after:border-b after:border-[#1CCFB9] after:border-1 after:inline-block dark:after:border-gray-700">
            <span className={`flex relative items-center justify-center w-10 h-10 border-2  border-black ${currPage == 2 ? 'stepper' : ''} rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
              2
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 step-text">
                Company owner
              </span>
            </span>
          </li>
          <li className="flex items-center w-full">
            <span className={`flex relative items-center justify-center w-10 h-10 border-2   border-black ${currPage == 3 ? 'stepper' : ''} rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
              3
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 step-text">
                Additional information
              </span>
            </span>
          </li>
        </ul>
      </div >
    </>
  )
}

