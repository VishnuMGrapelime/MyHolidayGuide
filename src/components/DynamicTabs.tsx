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
        socialMedia: '',
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

  return (
    <div className=''>
      <button
        className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        onClick={addTab}
      >
        Add social media account
      </button>

      <div className='border-b border-gray-200 dark:border-gray-700'>
        <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
          {tabs.map((tab) => (
            <li key={tab.id} className='me-2'>
              <a
                href='#'
                className={`inline-flex items-center justify-center p-4 ${activeTab === tab.id ? activeClass : inactiveClass}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.title}
                <svg
                  className='w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  onClick={() => deleteTab(tab.id)}
                >
                  <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-4'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`mt-4 ${activeTab === tab.id ? '' : 'hidden'}`}
          >
            <h2 className='text-xl font-bold'>{tab.title}</h2>
            <div className='mt-2'>
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
            </div>
            <div className='mt-2'>
              <label
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
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTabs;
