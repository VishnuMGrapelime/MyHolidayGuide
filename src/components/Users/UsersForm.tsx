'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import 'flowbite/dist/flowbite.min.css';

import ImageUpload from '@/components/ImageUpload/ImageUpload';
import { ItemsFormElement } from '@/components/Items/ItemsFormElement';

import { addData, updateData } from '@/firebase/firestore/data';
import { useTranslation } from '@/app/i18n/client';

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
  //const [address, setAddress] = useState('');

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
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
            {page + ' ' + itemName}
          </h2>
        </div>

        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          {/* <h2 className='text-xl font-bold mb-4'>Upload Beach Image</h2> */}
          <div className='bg-white  rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-10'>{itemName} Details</h2>
            <div className='flex flex-wrap'>
              <div className='w-full'>

                <form >
                  <div className='grid items-end w-full mx-auto gap-6 mb-6 md:grid-cols-1'>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='companyIdNo'
                        // value={formState.companyIdNo}
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
                      <p className='text- md:text- px-4 label '>
                        <span>{t('step1.companyIdNo.label')}</span>
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='companyName'
                        // value={formState.companyName}
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
                      <p className='text- md:text- px-4 label'>
                        <span>{t('step1.companyName.label')}</span>
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='companyName2'
                        // value={formState.companyName2}
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
                      <p className='text- md:text- px-4 label'>
                        <span>{t('step1.companyName2.label')}</span>
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='address1'
                        // value={formState.address1}
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
                      <p className='text- md:text- px-4 label'>
                        <span>
                          {t('step1.address1.label')}
                        </span>
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='default_outlined'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='address2'
                        // value={formState.address2}
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
                      <p className='text- md:text- px-4 label'>
                        <span>
                          {t('step1.address2.label')}
                        </span>
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='streetNumber'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='streetNumber'
                        // value={formState.streetNumber}
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
                      <p className='text- md:text- px-4 label'>
                        <span>
                          {t('step1.streetNumber.label')}
                        </span>
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='postOffice'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='postOffice'
                        // value={formState.postOffice}
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
                      <p className='text- md:text- px-4 label'>
                        <span>
                          {t('step1.postOffice.label')}
                        </span>
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='zipCode'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='zipCode'
                        // value={formState.zipCode}
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
                      <p className='text- md:text- px-4 label'>
                        <span>
                          {t('step1.zipCode.label')}
                        </span>
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='city'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='city'
                        // value={formState.city}
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
                      <p className='text- md:text- px-4 label'>
                        <span>{t('step1.city.label')} </span>
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <div className='relative '>
                        <input
                          type='text'
                          id='country'
                          className='block px-2.5 input-field   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1CCFB9] focus:outline-none focus:ring-0 focus:border-[#1CCFB9] peer'
                          placeholder=' '
                          name='country'
                        // value={formState.country}
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
                      <p className='text- md:text- px-4 label'>
                        <span>
                          {t('step1.country.label')}
                        </span>
                      </p>
                    </div>
                    <div className='py-6 flex flex-col gap-y-6 md:gap-x-20 md:flex-row justify-end w-full'>
                      {/* <ButtonOutline label='Back' /> */}
                      {/* <Button label={t('nextButton')} /> */}
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:flex-row md:justify-start md:items-center'>
          {/* <h2 className='text-xl font-bold mb-4'>Upload Beach Image</h2> */}
          <div className='bg-white  rounded px-8 pt-6 pb-8 mb-4 flex-auto w-64 '>
            <h2 className='text-xl font-bold mb-4'>
              {itemName} Location details
            </h2>
            <section className='w-2/4 mx-auto max-w-screen-xl p-4 mt-4'>
              {/* {address && (
                <div className='pt-4'>
                  <label
                    htmlFor='itemtype'
                    className='block text-sm font-medium leading-6'
                  >
                    {itemName} Address
                  </label>
                  <div className='mt-2'>
                    <input
                      name='address'
                      type='text'
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                      className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              )} */}

              <div className='pt-4'>
                <label
                  htmlFor='itemtype'
                  className='block text-sm font-medium leading-6'
                >
                  {itemName} Latitude
                </label>
                <div className='mt-2'>
                  <input
                    name='latitude'
                    type='text'
                    // value={latitude}
                    required
                    //onChange={(e) => setLatitude(e.target.value)}
                    className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='pt-4'>
                <label
                  htmlFor='itemtype'
                  className='block text-sm font-medium leading-6'
                >
                  {itemName} Longitude
                </label>
                <div className='mt-2'>
                  <input
                    name='longitude'
                    type='text'
                    // value={longitude}
                    required
                    // onChange={(e) => setLongitude(e.target.value)}
                    className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:flex-row md:justify-start md:items-center'>
          {/* <h2 className='text-xl font-bold mb-4'>Upload Beach Image</h2> */}
          <div className='bg-white  rounded px-8 pt-6 pb-8 mb-4 flex-auto w-64 '>
            <h2 className='text-xl font-bold mb-4'>Upload {itemName} Image</h2>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                {itemName} Image
              </label>

              <ImageUpload
                folderName='services/'
                updateImageUrl={handleImageUrl}
              />
            </div>
          </div>

          <div className='bg-white  rounded px-8 pt-6 pb-8 mb-4'>
            {imageUrl && (
              <Image
                src={imageUrl}
                width={300}
                height={300}
                priority={false}
                alt='Picture of the Service'
              />
            )}
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
      </div>
    </section>
  );
};

export default UsersForm;
