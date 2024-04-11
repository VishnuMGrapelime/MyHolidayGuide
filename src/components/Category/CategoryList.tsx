import { useEffect, useState } from 'react';

import CategoryForm from '@/components/Category/CategoryForm';

import { getData } from '@/firebase/firestore/data';

export const CategoryList = ({ lang }: { lang: string }) => {
  const [enableAdd, setEnableAdd] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryItems: any = (await getData('category')).result;

      const formatedData = categoryItems?.map((item: any) => ({
        id: item.id,
        categoryName: item[lang].categoryName,
      }));

      setCategoryList(formatedData);
    };

    getCategories();
  }, [getData]);

  const handleCloseModal = () => {
    setEnableAdd(false);
  };

  return (
    <div className='bg-white rounded-lg shadow m-4 dark:bg-gray-800'>
      <link
        rel='stylesheet'
        href='https://cdn.tailgrids.com/tailgrids-fallback.css'
      />

      <section className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <div className='container' style={{ minHeight: '700px' }}>
          <div style={{ padding: '10px 0px' }}>
            <button
              onClick={() => setEnableAdd(true)}
              //href='javascript:void(0)'
              className='
              border border-primary
              py-2
              px-6
              text-primary
              inline-block
              rounded
              hover:bg-primary hover:text-white
              '
            >
              Add Category
            </button>

            {enableAdd === true && (
              <div className='modal-overlay'>
                <div className='modal'>
                  <button
                    className='modal-close-btn'
                    onClick={handleCloseModal}
                  >
                    &times; close model
                  </button>
                  <div className='modal-content'>
                    {/* Modal content goes here */}
                    <CategoryForm />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-wrap -mx-4'>
            <div className='w-full px-4'>
              <div className='max-w-full overflow-x-auto'>
                <table className='table-auto w-full'>
                  <thead>
                    <tr className='bg-primary text-center'>
                      <th
                        className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           '
                      >
                        Category ID
                      </th>
                      <th
                        className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           '
                      >
                        Category Name
                      </th>

                      <th
                        className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           '
                      >
                        Register
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList.map((category: any, id) => (
                      <tr key={id}>
                        <td
                          className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           '
                        >
                          {category.id}
                        </td>
                        <td
                          className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           '
                        >
                          {category.categoryName}
                        </td>
                        <td
                          className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-r border-[#E8E8E8]
                           '
                        >
                          <a
                            href='javascript:void(0)'
                            className='
                              border border-primary
                              py-2
                              px-6
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              '
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
