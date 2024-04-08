import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import gbFlag from '../../assets/img/bg_flag.png';
import geFlag from '../../assets/img/german_flag.png';

const LangSwitcher: React.FC = ({ lang }) => {
  interface Option {
    country: string;
    code: string;
    flag: StaticImageData;
  }

  const router = useRouter();
  const pathname = usePathname();

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

  const options: Option[] = [
    { country: 'English', code: 'en', flag: gbFlag },
    { country: 'French', code: 'fr', flag: geFlag },
    // { country: 'Spanish', code: 'es', flag: esFlag },
    // { country: 'Swedish', code: 'sv', flag: svFlag },
    // { country: 'Dutch', code: 'nl', flag: nlFlag },
  ];

  const [language, setLanguage] = useState(options[0].flag.src)



  useEffect(() => {

    if (lang) {
      const langOption = options.find(option => option.code === lang);
      //console.log(langOption.flag.src);
      setLanguage(langOption.flag.src)
    }

  }, [lang])

  const setOption = (option: Option) => {
    let url = pathname?.toString();
    url = url.replace(`/${lang}/`, `/${option.code}/`);
    if (url == pathname) {
      url = url.replace(`/${lang}`, `/${option.code}`);
    }
    //console.log('new url ' + url);

    setIsOptionsExpanded(false);
    setLanguage(option.flag);
    router.push(url);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='relative text-lg '>
        <button
          className='justify-between rounded-lg hover:bg-gray-100 hover:rounded-lg
           focus:outline-none font-normal bg-white  dark:bg-black text-sm px-2 py-2.5 text-center 
          inline-flex items-center dark:focus:ring-blue-800 dark:hover:bg-neutral-800'
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          <Image src={language} width='20' height='20' alt='logo' />&nbsp;
          <svg
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className={`h-4 w-4  transform transition-transform duration-200 ease-in-out ${isOptionsExpanded ? 'rotate-180' : 'rotate-0'
              }`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>
        <div
          className={`transition-transform duration-500 ease-custom ${!isOptionsExpanded
            ? '-translate-y-1/2 scale-y-0 opacity-0'
            : 'translate-y-0 scale-y-100 opacity-100'
            }`}
        >
          <ul className='absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-24 dark:bg-neutral-700'>
            {options.map((option, index) => (
              <li
                key={index}
                className='px-3 py-2 transition-colors duration-300 hover:bg-gray-200 flex items-center cursor-pointer'
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOption(option);
                }}
                onClick={() => setOption(option)}
              >
                <Image src={option.flag} width='20' height='20' alt='logo' />
                {lang === option.code && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-7 h-7 text-green-500 ml-auto'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={3}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LangSwitcher;
