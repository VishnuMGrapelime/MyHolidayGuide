'use client';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().required(),
  details: Yup.string().required(),
  address: Yup.string().required(),
  latitude: Yup.number()
  .required('Latitude is required')
  .min(-90, 'Latitude must be between -90 and 90')
  .max(90, 'Latitude must be between -90 and 90'),
  longitude: Yup.number()
  .required('Longitude is required')
  .min(-180, 'Longitude must be between -180 and 180')
  .max(180, 'Longitude must be between -180 and 180'),
});

export const ItemsFormElement = ({
  lang,
  itemName,
  page,
  newTab,
  itemsLangData, // language specific
  updateDataField,
}) => {
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    console.log('Language data');
    console.log(itemsLangData);
    if (itemsLangData) {
      setItemData(itemsLangData[lang]);
    } else {
      console.log('setting empty');
      setItemData({});
    }
  }, []);

  const langRef = useRef('en');

  function addNewLanguageData() {
    const selLang = langRef.current.value;
    const langKey = selLang == 'new' ? itemData.itemLan : selLang;

    itemsLangData[langKey] = itemData;
    updateDataField(itemsLangData);

    newTab
      ? toast.success('New language added successfully', {
          duration: 4000,
          position: 'top-center',
        })
      : toast.success('Language updated successfully', {
          duration: 4000,
          position: 'top-center',
        });
  }

  const languageList = [
    { name: 'Croatian', code: 'hr' },
    { name: 'Czech', code: 'cs' },
    { name: 'Dutch', code: 'nl' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Chinese', code: 'cn' },
  ];

  return (
    <section className='w-2/4 mx-auto max-w-screen-xl p-4 mt-4'>
      <input type='hidden' value={newTab ? 'new' : lang} ref={langRef} />
      {newTab && (
        <div className=''>
          <label
            htmlFor='itemname'
            className='block text-sm font-medium leading-6'
          >
            Select an option
          </label>
          <div className='mt-2'>
            <select
              id='language'
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              name='language'
              onChange={(e) =>
                setItemData({ ...itemData, itemLan: e.target.value })
              }
            >
              <option selected>Choose a country</option>
              {languageList.map((item, index) => (
                <option value={item.code} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className='mt-2'>
        <label
          htmlFor='itemname'
          className='block text-sm font-medium leading-6'
        >
          {itemName} Name {lang}
        </label>
        <div className='mt-2'>
          <input
            name='categoryNameEn'
            type='text'
            onChange={(e) =>
              setItemData({ ...itemData, itemName: e.target.value })
            }
            value={itemData?.itemName || ''}
            required
            className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div className='pt-4'>
        <label
          htmlFor='itemtype'
          className='block text-sm font-medium leading-6'
        >
          {itemName} Type
        </label>
        <div className='mt-2'>
          <input
            name='categoryNameEn'
            type='text'
            onChange={(e) =>
              setItemData({ ...itemData, itemType: e.target.value })
            }
            value={itemData?.itemType || ''}
            required
            className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div className='pt-4'>
        <label htmlFor='email' className='block text-sm font-medium leading-6'>
          {itemName} Details
        </label>
        <div className='mt-2'>
          <input
            name='categoryNameEn'
            type='text'
            onChange={(e) =>
              setItemData({ ...itemData, itemDetails: e.target.value })
            }
            value={itemData?.itemDetails || ''}
            required
            className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div className='pt-4'>
        <label htmlFor='email' className='block text-sm font-medium leading-6'>
          {itemName} Location
        </label>
        <div className='mt-2'>
          <input
            name='categoryNameEn'
            type='text'
            onChange={(e) =>
              setItemData({ ...itemData, itemAddress: e.target.value })
            }
            value={itemData?.itemAddress || ''}
            required
            className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div className='pt-4'>
        <label htmlFor='email' className='block text-sm font-medium leading-6'>
          {itemName} Latitude
        </label>
        <div className='mt-2'>
          <input
            name='categoryNameEn'
            type='text'
            onChange={(e) =>
              setItemData({ ...itemData, itemLat: e.target.value })
            }
            value={itemData?.itemLat || ''}
            required
            className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div className='pt-4'>
        <label htmlFor='email' className='block text-sm font-medium leading-6'>
          {itemName} Longitude
        </label>
        <div className='mt-2'>
          <input
            name='categoryNameEn'
            type='text'
            onChange={(e) =>
              setItemData({ ...itemData, itemLong: e.target.value })
            }
            value={itemData?.itemLong || ''}
            required
            className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div className='mt-5'>
        <button
          className='disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
          onClick={() => addNewLanguageData()}
        >
          {page + ' Language'}
        </button>
      </div>
    </section>
  );
};
