'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

export const ItemsFormElement = ({
  lang,
  itemName,
  page,
  newTab,
  itemsLangData, // language specific
  updateDataField,
}) => {
  const schema = Yup.object().shape({
    itemName: Yup.string().required(itemName + 'name is required'),
    itemType: Yup.string().required(itemName + 'type is required'),
    itemDetails: Yup.string().required(itemName + 'details is required'),
    itemAddress: Yup.string().required(itemName + 'address is required'),
  });

  const [itemData, setItemData] = useState({});
  const [intilDataLoad, setIntilDataLoad] = useState(false);
  const [initialValues, setInitialValues] = useState({
    itemLang: '',
    itemName: '',
    itemType: '',
    itemDetails: '',
    itemAddress: '',
  });

  const onSubmit = (values) => {
    const selLang = langRef.current.value;
    const langKey = selLang == 'new' ? values.itemLang : selLang;
    delete values.itemLang;
    itemsLangData[langKey] = values;
    console.log(itemsLangData);

    // updateDataField(itemsLangData);

    newTab
      ? toast.success('New language added successfully', {
          duration: 4000,
          position: 'top-center',
        })
      : toast.success('Language updated successfully', {
          duration: 4000,
          position: 'top-center',
        });
  };

  useEffect(() => {
    console.log('Language data');
    // console.log(itemsLangData);
    if (itemsLangData) {
      setItemData(itemsLangData[lang]);
      setInitialValues({ ...itemsLangData[lang] }, { itemLang: '' });

      setIntilDataLoad(true);
    } else {
      console.log('setting empty');
      setInitialValues({
        itemLang: '',
        itemName: '',
        itemType: '',
        itemDetails: '',
        itemAddress: '',
      });

      setItemData({});
      setIntilDataLoad(true);
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
      {intilDataLoad && (
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          <Form>
            <input type='hidden' value={newTab ? 'new' : lang} ref={langRef} />
            {/* <Field type='hidden' name='selLang' value={newTab ? 'new' : lang} /> */}
            {newTab && (
              <div className=''>
                <label
                  htmlFor='itemname'
                  className='block text-sm font-medium leading-6'
                >
                  Select an option
                </label>
                <div className='mt-2'>
                  <Field
                    as='select'
                    className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    name='itemLang'
                  >
                    <option selected>Choose a language</option>
                    {languageList.map((item, index) => (
                      <option value={item.code} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  {/* <select
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
              </select> */}
                </div>
              </div>
            )}

            <div className='mt-2'>
              <label
                htmlFor='itemname'
                className='block text-sm font-medium leading-6'
              >
                {itemName} Name
              </label>
              <div className='mt-2'>
                <Field
                  type='text'
                  name='itemName'
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
                <ErrorMessage name='itemName' component='div' />
                {/* <input
              name='categoryNameEn'
              type='text'
              onChange={(e) =>
                setItemData({ ...itemData, itemName: e.target.value })
              }
              value={itemData?.itemName || ''}
              required
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
            /> */}
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
                <Field
                  type='text'
                  name='itemType'
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
                <ErrorMessage name='itemType' component='div' />
                {/* <input
              name='categoryNameEn'
              type='text'
              onChange={(e) =>
                setItemData({ ...itemData, itemType: e.target.value })
              }
              value={itemData?.itemType || ''}
              required
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
            /> */}
              </div>
            </div>

            <div className='pt-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                {itemName} Details
              </label>
              <div className='mt-2'>
                <Field
                  type='text'
                  name='itemDetails'
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
                <ErrorMessage name='itemDetails' component='div' />

                {/* <input
              name='categoryNameEn'
              type='text'
              onChange={(e) =>
                setItemData({ ...itemData, itemDetails: e.target.value })
              }
              value={itemData?.itemDetails || ''}
              required
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
            /> */}
              </div>
            </div>

            <div className='pt-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                {itemName} Address
              </label>
              <div className='mt-2'>
                <Field
                  type='text'
                  name='itemAddress'
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
                <ErrorMessage name='itemAddress' component='div' />

                {/* <input
              name='categoryNameEn'
              type='text'
              onChange={(e) =>
                setItemData({ ...itemData, itemDetails: e.target.value })
              }
              value={itemData?.itemDetails || ''}
              required
              className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
            /> */}
              </div>
            </div>

            <div className='mt-5'>
              <button
                className='disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                type='submit'
                //onClick={() => addNewLanguageData()}
              >
                {page + ' Language'}
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </section>
  );
};
