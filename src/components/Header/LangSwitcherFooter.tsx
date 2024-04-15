import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import gbFlag from '../../assets/img/bg_flag.png';
import frFlag from '../../assets/img/french_flag.png';
import { Span } from 'next/dist/trace';

const LangSwitcherFooter = ({ lang }: { lang: string }) => {
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

  const [language, setLanguage] = useState(options[0].code)



  useEffect(() => {

    if (lang) {
      const langOption = options.find(option => option.code === lang);
      //console.log(langOption.flag.src);
      if (langOption) {
        setLanguage(langOption.code)
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
      setLanguage(option.code);
      router.push(url);
    }

    //console.log('new url ' + url);


  };

  return (
    <div className='flex items-center justify-center'>
      <div className='relative text-lg '>
        <button
          className='justify-between rounded-lg  hover:rounded-lg
           focus:outline-none     text-sm px-1   text-center 
          inline-flex items-center dark:focus:ring-blue-800 '
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          <span className="footerTrans">{language}</span>
        </button>
        <div
          className={`transition-transform duration-500 ease-custom ${!isOptionsExpanded
            ? '-translate-y-1/2 scale-y-0 opacity-0'
            : 'translate-y-0 scale-y-100 opacity-100'
            }`}
        >
          <ul className='absolute left-0 right-0 mb-4 text-black w-11
           bg-white shadow-md  items-center text-center overflow-hidden  '>
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
                {option.code}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <svg className="-mr-1 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

export default LangSwitcherFooter;
