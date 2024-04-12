import { Datepicker } from 'flowbite-react';
import { ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import * as Yup from 'yup';

import DynamicTabs from '@/components/DynamicTabs';
import { Button, ButtonOutline } from '@/components/Elements/Button';
import { ValidationBox } from '@/components/Elements/ValidationBox';
import { useTranslation } from '../../app/i18n/client';


const options = [
  { value: 'activities', label: 'Activities' },
  { value: 'boatsyachts', label: 'Boats & Yachts' },
  { value: 'transfers', label: 'Transfers' },
];
const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '0 0 0.5rem 0.5rem', // Round bottom corners
    marginTop: '0', // Remove top margin
    boxShadow: 'none', // Remove shadow
    border: '1px solid #E5E7EB', // Add border
  }),
  option: (provided: any) => ({
    ...provided,
    // padding: '0.5rem', // Add padding to options
  }),
  indicatorSeparator: (base: any) => ({
    display: 'none',
  }),

  control: (provided: any, state: any) => ({
    ...provided,
    padding: ' 5px',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#1CCFB9' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #1CCFB9' : provided.boxShadow,
    '&:hover': {
      borderColor: state.isFocused ? '#1CCFB9' : provided.borderColor,
    },
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    color: '#666', // Change this to your desired color
    padding: '0',
  }),
};

const SignUpThree = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
  finalSubmit,
  lang
}: {
  nextStep: any,
  prevStep: any,
  formData: any,
  updateFormData: any,
  finalSubmit: any,
  lang: string
}) => {

  const { t } = useTranslation(lang, 'companyRegistration-page');
  const { d }: any = useTranslation(lang, 'dynamic-socialmediatab');

  // Yup schema to validate the form
  const schema = Yup.object().shape({
    companyWebsite: Yup.string().required(t('step3.companyWebsite.validation')),
    employeeCount: Yup.string().required(t('step3.employeeCount.validation')),
    turnOver: Yup.string().required(t('step3.turnOver.validation')),
    companyLanguage: Yup.string().required(t('step3.companyLanguage.validation')),
    acceptTerms: Yup.boolean()
      .oneOf([true], t('step3.acceptTerms.validation'))
      .required(t('step3.acceptTerms.validation')),
  });


  // interface FormState {
  //   companyWebsite: string;
  //   employeeCount: string;
  //   turnOver: string;
  //   companyLanguage: string;
  //   acceptTerms: boolean;
  //   compBusinessType?: string[];
  // }

  const [formState, setFormState] = useState<{ [key: string]: any }>({
    companyWebsite: 'https://',
    employeeCount: '',
    turnOver: '',
    companyLanguage: 'english',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    companyWebsite: '',
    employeeCount: '',
    turnOver: '',
    companyLanguage: '',
    acceptTerms: '',
  });

  const [errorStatus, setErrorStatus] = useState(false);

  const [tabs, setTabs] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0)
    // console.log(formData.companyLanguage);
    if (formData) {
      setFormState({
        companyWebsite: formData.companyWebsite,
        employeeCount: formData.employeeCount,
        turnOver: formData.turnOver,
        companyLanguage: formData.companyLanguage
          ? formData.companyLanguage
          : formState.companyLanguage,
        acceptTerms: formData.acceptTerms,
      });
      console.log(formData.selectedOption);
      setSelectedOption(formData.selectedOption);
      console.log("Exist since " + formData.existSince);
      setSelectedDate(formData.existSince);
      if (formData.socialTabs) {
        setTabs(formData.socialTabs);
      }
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  interface Option {
    value: string;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    window.scrollTo(0, 0)
    setErrorStatus(false);

    try {
      // Validate the form data

      const businessType: any = [];

      if (typeof selectedOption !== 'undefined') {
        //if (selectedOption.length > 0) {
        if (selectedOption) {
          // selectedOption.map((item: Option) => {
          //   businessType.push(item.value);
          // });

          (selectedOption as Array<{ value: string }>).forEach((item: Option) => {
            businessType.push(item.value);
          });
        }
        setFormState({ ...formState, compBusinessType: businessType });
      }

      console.log('working 1');
      const socialData: any = [];
      if (tabs.length > 0) {
        tabs.map((item: any) => {
          //console.log(item);
          socialData.push(item.values);
        });

        setFormState({ ...formState, socialUrl: socialData });
      }

      console.log(formState);

      await schema.validate(formState, { abortEarly: false });

      console.log('Form is valid', formState);
      finalSubmit(formState);
    } catch (error) {
      setErrorStatus(true);
      if (error instanceof Yup.ValidationError) {
        // Update the errors state with the validation errors
        const errorMessages: any = error.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        console.log(errorMessages);
        setErrors(errorMessages);
      }
    }
  };

  const setTermsAndConditions = (value: boolean) => {
    setFormState({ ...formState, acceptTerms: value });
  };

  const handleDateChange = (date: any) => {
    const givenDateTime = new Date(date);

    // Convert the Date object to a date string
    const formattedDate = `${givenDateTime.getDate().toString().padStart(2, '0')}/${(givenDateTime.getMonth() + 1).toString().padStart(2, '0')}/${givenDateTime.getFullYear()}`;

    console.log(formattedDate);
    setFormState({ ...formState, existSince: formattedDate });
    // console.log(formState);

    setSelectedDate(date);
  };

  const handleBusinessTypeChange = (value: any) => {
    setSelectedOption(value);
    setFormState({ ...formState, selectedOption: value });
  };

  const gotoPrevStep = () => {
    // setFormState({ ...formState, socialTabs: tabs });
    if (tabs) {
      updateFormData({ ...formState, socialTabs: tabs });
    } else {
      updateFormData(formState);
    }

    console.log(formState);
    prevStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='py-6 md:m-12 md:p-12'>
          <div className='w-full  mx-auto  md:text-center'>
            <h2 className='pb-6 md:pb-6 md:leading-6 text-h2 md:text-[2.35rem] font-bold  whitespace-nowrap'>
              <span>{t('step2Text')}</span>
            </h2>
            <p className='text-p1 md:text-[1.3125rem] leading-6 font-bold  md:whitespace-nowrap'>
              <span>{t('step3.subtext1')}</span>
            </p>
            <p className='text-[1rem] leading-6 pt-2 md:pt-9'>
              <span>
                {t('step3.subtext2')}
              </span>
            </p>
          </div>
        </div>
        {errorStatus && <ValidationBox errors={errors} />}
        <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='companyWebsite'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                // className='form-field dark:form-field'
                name='companyWebsite'
                value={formState.companyWebsite}
                onChange={handleChange}
              />
              <label
                htmlFor='companyWebsite'
                // className='floating-label dark:floating-label'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step3.companyWebsite.placeholder')}
              </label>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ClipboardCheck color='#1CCFB9' />
              </div>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step3.companyWebsite.label')}</span>
            </p>
          </div>

          <div className=''>
            <DynamicTabs tabs={tabs} setTabs={setTabs} d={d} lang={lang} />
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <input
                type='text'
                id='employeeCount'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                placeholder=' '
                name='employeeCount'
                value={formState.employeeCount}
                onChange={handleChange}
              />
              <label
                htmlFor='employeeCount'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step3.employeeCount.placeholder')}
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step3.employeeCount.label')}</span>
            </p>
          </div>

          <div className='space-y-1'>
            <div className='relative'>
              <Datepicker
                id='existSince'
                value={selectedDate}
                onSelectedDateChanged={handleDateChange}
                style={{ backgroundColor: 'white', paddingTop: '12px', paddingBottom: '11px' }}
                className='block pt-7 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer'
              />
              <label
                htmlFor='existSince'
                className='absolute top-[17px] bg-white left-[5px] z-10 px-1 text-[11px] text-gray-500 dark:bg-gray-900 dark:border-gray-600 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4'
              >
                {t('step3.existSince.placeholder')}
              </label>
              <p className='text-md:text-px mb-4' style={{ paddingLeft: '1rem' }}>
                <span>{t('step3.existSince.label')}</span>
              </p>
            </div>
          </div>

          <div className='space-y-1'>
            <div className='relative '>
              <select
                id='turnOver'
                className='block px-2.5   pb-2.5 pt-3 w-full text-sm 
              text-gray-900 bg-transparent rounded-lg 
              border-1 border-gray-300 appearance-none dark:text-white
              dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
               focus:ring-0 focus:border-[#1CCFB9] peer'
                name='turnOver'
                value={formState.turnOver}
                onChange={handleChange}
              >
                <option value='no'>----</option>
                <option value='0-50000'>0-50000 EUR</option>
                <option value='50000-100000'>50000-100000 EUR</option>
                <option value='100000-300000'>100000-300000 EUR</option>
                <option value='300000-500000'>300000-500000 EUR</option>
                <option value='500000-1000000'>500000-1000000 EUR</option>
                <option value='1000000+'>1000000+ EUR</option>
              </select>
              <label
                htmlFor='turnOver'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step3.turnOver.placeholder')}
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step3.turnOver.label')}</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative'>
              <label
                className='absolute top-3 left-[5px] z-10 px-1 text-[11px] text-gray-500 bg-white dark:bg-gray-900  dark:border-gray-600 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4'
                htmlFor='businessType'
              >
                {t('step3.businessType.placeholder')}
              </label>
              <Select
                className='block w-full   pt-6 text-sm text-gray-900 bg-transparent rounded-b-lg border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                id='businessType'
                options={options}
                isMulti
                //defaultValue={selectedOption}
                value={selectedOption}
                onChange={handleBusinessTypeChange}
                placeholder=''
                styles={customStyles}
              />
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step3.businessType.label')}</span>
            </p>
          </div>
          <div className='space-y-1'>
            <div className='relative '>
              <select
                id='companyLanguage'
                className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                name='companyLanguage'
                value={formState.companyLanguage}
                onChange={handleChange}
                defaultValue={formState.companyLanguage}
              >
                <option value='english'>English</option>
                <option value='german'>German</option>
                <option value='croatian'>Croatian</option>
              </select>
              <label
                htmlFor='companyLanguage'
                className='absolute z-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
              >
                {t('step3.companyLanguage.placeholder')}
              </label>
            </div>
            <p className='text- md:text- px-4 '>
              <span>{t('step3.companyLanguage.label')}</span>
            </p>
          </div>
        </div>
        <div className='flex items-start mb-5'>
          <div className='flex items-center h-5'>
            <input
              id='terms'
              type='checkbox'
              name='acceptTerms'
              checked={formState.acceptTerms}
              onChange={(e) => setTermsAndConditions(e.target.checked)}
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 
              focus:ring-[#1CCFB9] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#1CCFB9] 
              |dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 custom-checkbox'
            />
          </div>
          <label
            htmlFor='acceptTerms'
            className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            {t('step3.acceptTerms.placeholder')}{' '}
            <a
              href='#'
              className='text-[#1CCFB9] hover:underline dark:text-blue-500'
            >
              {t('step3.acceptTerms.label')}
            </a>
          </label>
        </div>
        <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-between w-full'>
          <ButtonOutline label={t('backButton')} prevStep={gotoPrevStep} />
          <Button label={t('sendButton')} />
        </div>
      </form>
    </>
  );
};

export default SignUpThree;
