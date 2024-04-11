import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import gbFlag from '../../assets/img/bg_flag.png';
import frFlag from '../../assets/img/french_flag.png';

const LangSwitcher = ({ lang }: { lang: string }) => {
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
    { country: 'French', code: 'fr', flag: frFlag },
    // { country: 'Spanish', code: 'es', flag: esFlag },
    // { country: 'Swedish', code: 'sv', flag: svFlag },
    // { country: 'Dutch', code: 'nl', flag: nlFlag },
  ];

  const [language, setLanguage] = useState(options[0].flag.src)



  useEffect(() => {

    if (lang) {
      const langOption = options.find(option => option.code === lang);
      //console.log(langOption.flag.src);
      if (langOption) {
        setLanguage(langOption.flag.src)
      }
    }

  }, [lang])

  const setOption = (option: Option) => {
    let url = pathname?.toString();

    if (url) {
      url = url.replace(`/${lang}/`, `/${option.code}/`);
      if (url == pathname) {
        url = url.replace(`/${lang}`, `/${option.code}`);
      }

      setIsOptionsExpanded(false);
      setLanguage(option.flag.src);
      router.push(url);
    }

    //console.log('new url ' + url);


  };

  return (
    <div className='flex items-center justify-center'>
      <div className='relative text-lg '>
        <button
          className='justify-between rounded-lg hover:bg-gray-100 hover:rounded-lg
           focus:outline-none font-normal bg-white  dark:bg-black text-sm px-2  py-2.5 text-center 
          inline-flex items-center dark:focus:ring-blue-800 dark:hover:bg-neutral-800'
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          <Image src={language} width='20' height='20' alt='logo' />&nbsp;
        </button>
        <div
          className={`transition-transform duration-500 ease-custom ${!isOptionsExpanded
            ? '-translate-y-1/2 scale-y-0 opacity-0'
            : 'translate-y-0 scale-y-100 opacity-100'
            }`}
        >
          <ul className='absolute left-0 right-0 mb-4 bg-white shadow-md  items-center text-center overflow-hidden  '>
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-3 py-2 transition-colors duration-300   hover:bg-gray-300 flex items-center cursor-pointer ${lang === option.code ? 'bg-gray-100' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOption(option);
                }}
                onClick={() => setOption(option)}
              >
                <Image src={option.flag} width='20' height='20' alt='logo' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LangSwitcher;
