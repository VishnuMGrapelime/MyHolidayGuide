import { useState } from 'react';

const DynamicTabs = ({ tabs, setTabs }) => {
  const [activeTab, setActiveTab] = useState(1); // State to track the active tab

  const activeClass =
    'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500';
  const inactiveClass =
    'border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';

  const addTab = (e) => {
    e.preventDefault();
    const newTab = {
      id: tabs.length + 1,
      title: `SOCIAL MEDIA ACCOUNT ${tabs.length + 1}`,
      content: `Content ${tabs.length + 1}`,
      values: {
        socialMedia: 'youtube',
        socialUrl: '',
      },
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id); // Set the newly added tab as the active tab
  };

  //    values: {
  //     socialMedia: '',
  //     socialUrl: '',
  //   },

  const handleSelectChange = (tabId, value) => {
    console.log(value);
    setTabs(
      tabs.map((tab) => {
        if (tab.id === tabId) {
          return { ...tab, values: { ...tab.values, socialMedia: value } };
        }
        return tab;
      }),
    );
  };

  const handleInputChange = (tabId, value) => {
    setTabs(
      tabs.map((tab) => {
        if (tab.id === tabId) {
          return { ...tab, values: { ...tab.values, socialUrl: value } };
        }
        return tab;
      }),
    );
  };

  const deleteTab = (id) => {
    // Filter out the tab to be deleted
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);

    // If the deleted tab was the active tab, reset the activeTab state
    if (activeTab === id) {
      // If there are still tabs left, set the first tab as active
      if (newTabs.length > 0) {
        setActiveTab(newTabs[0].id);
      } else {
        // If no tabs are left, reset the activeTab state
        setActiveTab(null);
      }
    }
  };

  const handleTabClick = (id) => {
    setActiveTab(id); // Set the clicked tab as the active tab
  };
  // document.addEventListener('DOMContentLoaded', function() {
  //   const selectElement = document.getElementById('default_outlined');
  //   const labelElement = document.querySelector('label[for="default_outlined"]');

  //   // Function to handle focus
  //   function handleFocus() {
  //      labelElement.classList.add('top-2', 'scale-75', 'transform', '-translate-y-4');
  //   }

  //   // Function to handle blur
  //   function handleBlur() {
  //      if (selectElement.value) {
  //        labelElement.classList.add('top-2', 'scale-75', 'transform', '-translate-y-4');
  //      } else {
  //        labelElement.classList.remove('top-2', 'scale-75', 'transform', '-translate-y-4');
  //      }
  //   }

  //   // Add event listeners
  //   selectElement.addEventListener('focus', handleFocus);
  //   selectElement.addEventListener('blur', handleBlur);

  //   // Initial check in case the select already has a value
  //   if (selectElement.value) {
  //      handleFocus();
  //   }
  //  });

  return (
    <div className=''>
      <button
        className='py-2.5 px-5 me-2 text-center align-content  mb-2 text-sm w-full font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-[#1CCFB9] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        onClick={addTab}
      >
        <svg
          className='w-6 h-6  text-gray-800 dark:text-white'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            fill-rule='evenodd'
            d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z'
            clip-rule='evenodd'
          />
        </svg>
        <span>&nbsp;&nbsp;Add social media account</span>
      </button>
      <div className='border-b border-gray-200 dark:border-gray-700 overflow-hidden'>
        <div className='scroll-container'>
          <ul className='flex flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
            {tabs.map((tab) => (
              <li key={tab.id} className='me-2'>
                <a
                  href='#'
                  className={`inline-flex items-center justify-center p-4 ${activeTab === tab.id ? activeClass : inactiveClass}`}
                  onClick={() => handleTabClick(tab.id)}>
                  {tab.title}
                  &nbsp;
                  <svg
                    onClick={() => deleteTab(tab.id)}
                    className='w-[19px] h-[19px] text-gray-800 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.2'
                      d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-4'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`mt-4 ${activeTab === tab.id ? '' : 'hidden'}`}
          >
            {/* <div className='mt-2'>
              <label
                htmlFor='dropdown'
                className='block text-sm font-medium text-gray-700'
              >
                Type
              </label>
              <select
                id='dropdown'
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                value={tab.values.socialMedia}
                onChange={(e) => handleSelectChange(tab.id, e.target.value)}
              >
                <option value='youtube'>Youtube</option>
                <option value='instagram'>Instagram</option>
              </select>
            </div> */}

            <div className='space-y-1'>
              <div className='relative '>
                <select
                  id='default_outlined'
                  className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  name='companyName'
                  value={tab.values.socialMedia}
                  onChange={(e) => handleSelectChange(tab.id, e.target.value)}
                >
                  <option value='youtube'>Youtube</option>
                  <option value='instagram'>Instagram</option>
                </select>
                <label
                  htmlFor='default_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                >
                  Type
                </label>
              </div>
              <p className='text- md:text- px-4 '>
                <span>Please enter your company name</span>
              </p>
            </div>
            <div className='mt-2'>
              {/* <label
                htmlFor='text-field'
                className='block text-sm font-medium text-gray-700'
              >
                URL
              </label>
              <input
                type='text'
                id='text-field'
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                placeholder='Enter text here'
                value={tab.values.socialUrl}
                onChange={(e) => handleInputChange(tab.id, e.target.value)}
              /> */}
              <div className='space-y-1'>
                <div className='relative '>
                  <input
                    type='text'
                    id='url'
                    className='block px-2.5   pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    name='companyName'
                    value={tab.values.socialUrl}
                    onChange={(e) => handleInputChange(tab.id, e.target.value)}
                  />
                  <label
                    htmlFor='url'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
                  >
                    URL
                  </label>
                </div>
                <p className='text- md:text- px-4 '>
                  <span>Please enter your company name</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTabs;
