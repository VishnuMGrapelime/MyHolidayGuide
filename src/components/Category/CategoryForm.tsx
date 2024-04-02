import { useState } from 'react';

import { addData } from '@/firebase/firestore/data';

const CategoryForm = () => {
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameCn, setCatNameCn] = useState('');
  const [catNameHr, setCatNameHr] = useState('');
  const [catNameCs, setCatNameCs] = useState('');
  const [catNameNl, setCatNameNl] = useState('');
  const [catNameFr, setCatNameFr] = useState('');
  const [catNameDe, setCatNameDe] = useState('');

  function addCategory() {
    const categoryDetails = {
      en: {
        categoryName: catNameEn,
      },
      cn: {
        categoryName: catNameCn,
      },
      hr: {
        categoryName: catNameHr,
      },
      cs: {
        categoryName: catNameCs,
      },
      nl: {
        categoryName: catNameNl,
      },
      fr: {
        categoryName: catNameFr,
      },
      de: {
        categoryName: catNameDe,
      },
    };

    const { error } = addData('category', categoryDetails);
  }
  return (
    <div>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
            Add Category
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Category Name in English
              </label>
              <div className='mt-2'>
                <input
                  name='categoryNameEn'
                  type='text'
                  onChange={(e) => setCatNameEn(e.target.value)}
                  value={catNameEn}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Category Name in Chinese
              </label>
              <div className='mt-2'>
                <input
                  name='categoryNameCn'
                  type='text'
                  onChange={(e) => setCatNameCn(e.target.value)}
                  value={catNameCn}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Category Name in Croatian
              </label>
              <div className='mt-2'>
                <input
                  name='categoryNameHr'
                  type='text'
                  value={catNameHr}
                  onChange={(e) => setCatNameHr(e.target.value)}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Category Name in Czech
              </label>
              <div className='mt-2'>
                <input
                  name='categoryNameCs'
                  type='text'
                  value={catNameCs}
                  onChange={(e) => setCatNameCs(e.target.value)}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Category Name in Dutch
              </label>
              <div className='mt-2'>
                <input
                  name='categoryNameNl'
                  type='text'
                  value={catNameNl}
                  onChange={(e) => setCatNameNl(e.target.value)}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Category Name in French
              </label>
              <div className='mt-2'>
                <input
                  name='categoryNameFr'
                  type='text'
                  value={catNameFr}
                  onChange={(e) => setCatNameFr(e.target.value)}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Category Name in German
              </label>
              <div className='mt-2'>
                <input
                  name='categoryNameDe'
                  type='text'
                  value={catNameDe}
                  onChange={(e) => setCatNameDe(e.target.value)}
                  required
                  className='block w-full rounded-md border-1 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                className='disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                onClick={() => addCategory()}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
