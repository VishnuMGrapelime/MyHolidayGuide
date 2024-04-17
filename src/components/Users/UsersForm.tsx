'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import 'flowbite/dist/flowbite.min.css';

import ImageUpload from '@/components/ImageUpload/ImageUpload';
import { ItemsFormElement } from '@/components/Items/ItemsFormElement';
import Select from 'react-select';

import { addData, updateData } from '@/firebase/firestore/data';
import { useTranslation } from '@/app/i18n/client';
import { Datepicker } from 'flowbite-react';
import DynamicTabs from '@/components/DynamicTabs';

const UsersForm = ({
  itemName,
  itemId,
  itemsData,
  page,
  category,
  returnUrl,
}: {
  itemName: string,
  itemId: any,
  itemsData: any,
  page: any,
  category: any,
  returnUrl: string,
}) => {

  const { t } = useTranslation("en", 'companyRegistration-page');

  const [langData, setLangData] = useState({});

  const router = useRouter();
  const [itemsLangData, setItemsLangData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [tabs, setTabs] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  //const [address, setAddress] = useState('');
  const [formState, setFormState] = useState({
    companyIdNo: '',
    companyName: '',
    companyName2: '',
    address1: '',
    address2: '',
    streetNumber: '',
    postOffice: '',
    zipCode: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    companyWebsite: 'https://',
    employeeCount: '',
    turnOver: '',
    companyLanguage: 'english',
  });

  useEffect(() => {
    window.scrollTo(0, 0)
    if (itemsData) {
      setFormState({
        companyIdNo: itemsData.companyIdNo,
        companyName: itemsData.companyName,
        companyName2: (itemsData.companyName2) ? itemsData.companyName2 : "",
        address1: itemsData.address1,
        address2: itemsData.address2,
        streetNumber: itemsData.streetNumber,
        postOffice: (itemsData.postOffice) ? itemsData.postOffice : "",
        zipCode: itemsData.zipCode,
        city: itemsData.city,
        country: itemsData.country,
        email: itemsData.email,
        phone: itemsData.phone,
        firstName: itemsData.firstName,
        lastName: itemsData.lastName,
        companyWebsite: itemsData.companyWebsite,
        employeeCount: itemsData.employeeCount,
        turnOver: itemsData.turnOver,
        companyLanguage: itemsData.companyLanguage
          ? itemsData.companyLanguage
          : formState.companyLanguage,
        //compBusinessType: itemsData.compBusinessType,
        // existSince: itemsData.existSince,
      });
    }
  }, []);

  const options = [
    { value: 'activities', label: 'Activities' },
    { value: 'boatsyachts', label: 'Boats & Yachts' },
    { value: 'transfers', label: 'Transfers' },
  ];

  const handleDateChange = (date: any) => {
    const givenDateTime = new Date(date);

    // Convert the Date object to a date string
    const formattedDate = `${givenDateTime.getDate().toString().padStart(2, '0')}/${(givenDateTime.getMonth() + 1).toString().padStart(2, '0')}/${givenDateTime.getFullYear()}`;

    console.log(formattedDate);
    // setFormState({ ...formState, existSince: formattedDate });
    // console.log(formState);

    setSelectedDate(formattedDate);
  };

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

  const updateItemsLangData = (data: any) => {
    // handling data from inner component and updating state
    const newArray: any = [];
    for (const key in data) {
      //if (data.hasOwnProperty(key)) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newArray[key] = data[key];
      }
    }
    setItemsLangData(newArray);
  };

  useEffect(() => {
    console.log('Image updated ');
  }, [imageUrl]);

  const handleImageUrl = (data: any) => {
    if (data) {
      setImageUrl(data);
      console.log('Image url ' + data);
    }
  };

  const addUpdateService = () => {
    const language = [];
    for (const key in itemsLangData) {
      language.push(key);
    }
    const currentTime = Date.now();

    if (!itemId) {
      // Add service

      const serviceDetails = {
        itemCategory: category,
        imageUrl: imageUrl,
        languages: language,
        created: currentTime,
        updated: currentTime,
        status: 'open',
        ...itemsLangData,
      };

      console.log('Printing service details');
      console.log(serviceDetails);

      const { error }: any = addData('services', serviceDetails);
      if (error) {
        toast.error(error);
      }

      toast.success('Service added successfully', {
        duration: 4000,
        position: 'top-center',
      });
    } else {
      // Update service

      // itemLangData[selLang] = itemData;
      const serviceDetails = {
        itemCategory: category,
        imageUrl: imageUrl,
        languages: language,
        updated: currentTime,
        ...itemsLangData,
      };

      console.log(serviceDetails);
      const { error }: any = updateData('services', itemId, serviceDetails);

      toast.success('Service updated successfully', {
        duration: 4000,
        position: 'top-center',
      });
    }

    router.push(returnUrl);
  };

  const NewTab = (
    <ItemsFormElement
      lang='en'
      itemName={itemName}
      page={page}
      newTab={true}
      itemsLangData={itemsLangData}
      updateDataField={updateItemsLangData}
    />
  );

  const EnglishTab = (
    <ItemsFormElement
      lang='en'
      itemName={itemName}
      page={page}
      newTab={false}
      itemsLangData={itemsLangData}
      updateDataField={updateItemsLangData}
    />
  );

  //const tabArray = [{ name: 'en', content: EnglishTab }];
  const tabArray: any = [];

  useEffect(() => {
    const langdataDb: any = [];
    if (itemsData.itemCategory) {
      // works for edit page

      for (const key in itemsData['languages']) {
        const ln = itemsData['languages'][key];
        langdataDb[ln] = itemsData[ln];
      }

      setItemsLangData(langdataDb);

      for (const key in itemsData['languages']) {
        const ln = itemsData['languages'][key];

        console.log('Print value ' + ln);
        // if (itemsData.hasOwnProperty(ln)) {
        if (Object.prototype.hasOwnProperty.call(itemsData, ln)) {
          // Printing Keys

          const tabContent = (
            <ItemsFormElement
              lang={ln}
              itemName={itemName}
              page={page}
              newTab={false}
              itemsLangData={langdataDb}
              updateDataField={updateItemsLangData}
            />
          );

          tabArray.push({
            name: ln,
            content: tabContent,
          });
        }
      }

      setLangData(itemsData);
      console.log(itemsData.address);

      setImageUrl(itemsData.imageUrl);
    } else {
      // works for add page

      tabArray.push({ name: 'en', content: EnglishTab });
      setLangData({});
    }
  }, []);

  return (
    <section className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
      <div className='container' style={{ minHeight: '700px' }}>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm mb-10'>
          {/* <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
            {page + ' ' + itemName}
          </h2> */}
        </div>
        <form >
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            {/* <h2 className='text-xl font-bold mb-4'>Upload Beach Image</h2> */}
            <div className='bg-white  rounded px-8 pt-6 pb-8 mb-4'>
              <h2 className='text-xl font-bold mb-10'>{itemName} Details</h2>
              <div className='flex flex-wrap'>
                <div className='w-full'>


                  <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='companyIdNo'
                          value={formState.companyIdNo}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='default_outlined'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.companyIdNo.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='companyName'
                          value={formState.companyName}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='default_outlined'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.companyName.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='companyName2'
                          value={formState.companyName2}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='default_outlined'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.companyName2.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='address1'
                          value={formState.address1}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='address1'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.address1.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='address2'
                          value={formState.address2}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='address2'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.address2.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='streetNumber'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='streetNumber'
                          value={formState.streetNumber}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='streetNumber'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.streetNumber.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='postOffice'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='postOffice'
                          value={formState.postOffice}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='postOffice'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.postOffice.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='zipCode'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='zipCode'
                          value={formState.zipCode}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='zipCode'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.zipCode.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='city'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='city'
                          value={formState.city}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='city'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.city.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>

                        </div>
                      </div>

                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='country'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='country'
                          value={formState.country}
                        // onChange={handleChange}
                        />
                        <label
                          htmlFor='country'
                          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                        >
                          {t('step1.country.placeholder')}
                        </label>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                        </div>
                      </div>

                    </div>
                    <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-end w-full'>
                      {/* <ButtonOutline label='Back' /> */}
                      {/* <Button label={t('nextButton')} /> */}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:flex-row md:justify-start md:items-center'>
            {/* <h2 className='text-xl font-bold mb-4'>Upload Beach Image</h2> */}
            <div className='bg-white  rounded px-8 pt-6 pb-8 mb-4 flex-auto w-64 '>
              <h2 className='text-xl font-bold mb-4'>
                {itemName} Owner Information
              </h2>
              <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
                <div className='space-y-1'>
                  <div className='relative '>
                    <input
                      type='text'
                      id='default_outlined'
                      className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                      placeholder=' '
                      name='email'
                      value={formState.email}
                    //onChange={handleChange}
                    />
                    <label
                      htmlFor='default_outlined'
                      className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                    >
                      {t('step2.email.placeholder')}
                    </label>

                  </div>

                </div>

                <div className='space-y-1'>
                  <div className='relative '>
                    <input
                      type='text'
                      id='phonenum'
                      className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                      placeholder=' '
                      name='phone'
                      value={formState.phone}
                    // onChange={handleChange}
                    />
                    <label
                      htmlFor='phonenum'
                      className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                    >
                      {t('step2.phone.placeholder')}
                    </label>

                  </div>

                </div>
                <div className='space-y-1'>
                  <div className='relative '>
                    <input
                      type='text'
                      id='default_outlined'
                      className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                      placeholder=' '
                      name='firstName'
                      value={formState.firstName}
                    //onChange={handleChange}
                    />
                    <label
                      htmlFor='default_outlined'
                      className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                    >
                      {t('step2.firstName.placeholder')}
                    </label>

                  </div>

                </div>

                <div className='space-y-1'>
                  <div className='relative '>
                    <input
                      type='text'
                      id='lastname'
                      className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                      placeholder=' '
                      name='lastName'
                      value={formState.lastName}
                    //onChange={handleChange}
                    />
                    <label
                      htmlFor='lastname'
                      className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                    >
                      {t('step2.lastName.placeholder')}
                    </label>

                  </div>

                </div>





              </div>
            </div>
          </div>

          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:flex-row md:justify-start md:items-center'>
            <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
              <div className='space-y-1'>
                <div className='relative '>
                  <input
                    type='text'
                    id='companyWebsite'
                    className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                    placeholder=' '
                    // className='form-field dark:form-field'
                    name='companyWebsite'
                    value={formState.companyWebsite}
                  //onChange={handleChange}
                  />
                  <label
                    htmlFor='companyWebsite'
                    // className='floating-label dark:floating-label'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                  >
                    {t('step3.companyWebsite.placeholder')}
                  </label>

                </div>

              </div>

              <div className=''>
                <DynamicTabs tabs={tabs} setTabs={setTabs} d="en" lang="en" />
              </div>

              <div className='space-y-1'>
                <div className='relative '>
                  <input
                    type='text'
                    id='employeeCount'
                    className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                    placeholder=' '
                    name='employeeCount'
                    value={formState.employeeCount}
                  // onChange={handleChange}
                  />
                  <label
                    htmlFor='employeeCount'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                  >
                    {t('step3.employeeCount.placeholder')}
                  </label>
                </div>

              </div>

              <div className='space-y-1'>
                <div className='relative'>
                  <Datepicker
                    id='existSince'
                    value={selectedDate}
                    onSelectedDateChanged={handleDateChange}
                    style={{ backgroundColor: 'transparent', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '39px' }}
                    className='block pt-7 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1  border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer'
                  />
                  <label
                    htmlFor='existSince'
                    className='absolute top-[17px] bg-white left-[5px] z-10 px-1 text-[11px] text-gray-500 dark:bg-[#010e1e] dark:border-gray-600 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4'
                  >
                    {t('step3.existSince.placeholder')}
                  </label>

                </div>
              </div>

              <div className='space-y-1'>
                <div className='relative '>
                  <select
                    id='turnOver'
                    className='block  px-2.5 input-field   pb-2.5 pt-4 w-full text-sm dark:bg-transparent text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                    name='turnOver'
                    value={formState.turnOver}
                  //onChange={handleChange}
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
                    className='absolute text-sm text-gray-500 dark:text-gray-400  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                  >
                    {t('step3.turnOver.placeholder')}
                  </label>
                </div>

              </div>
              <div className='space-y-1'>
                <div className='relative'>
                  <label
                    className='absolute top-3 left-[5px] bg-transparent z-30 px-1 text-[11px] text-gray-500 bg-white dark:bg-gray-900  dark:border-gray-600 peer-focus:text-[#1CCFB9] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4'
                    htmlFor='businessType'
                  >
                    {t('step3.businessType.placeholder')}
                  </label>
                  <Select
                    className='block w-full dark:border-gray-600 z-20   pt-6 text-sm text-gray-900 bg-transparent rounded-b-lg border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                    id='businessType'
                    options={options}
                    isMulti
                    //defaultValue={selectedOption}
                    value={selectedOption}
                    // onChange={handleBusinessTypeChange}
                    placeholder=''
                    styles={customStyles}
                  />
                </div>

              </div>
              <div className='space-y-1'>
                <div className='relative '>
                  <select
                    id='companyLanguage'
                    className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                    name='companyLanguage'
                    value={formState.companyLanguage}
                    // onChange={handleChange}
                    defaultValue={formState.companyLanguage}
                  >
                    <option value='english'>English</option>
                    <option value='german'>German</option>
                    <option value='croatian'>Croatian</option>
                  </select>
                  <label
                    htmlFor='companyLanguage'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#010e1e] px-2 peer-focus:px-2 peer-focus:text-[#1CCFB9] peer-focus:dark:text-[#1CCFB9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                  >
                    {t('step3.companyLanguage.placeholder')}
                  </label>
                </div>

              </div>
            </div>
          </div>

          <button
            className='disabled:opacity-40 flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            onClick={() => {
              addUpdateService();
            }}
          >
            {page + ' ' + itemName}
          </button>
        </form>
      </div>

    </section>
  );
};

export default UsersForm;
