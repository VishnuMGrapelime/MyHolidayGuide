import { useState } from 'react';

export const TabView = ({ title, tabs = [], newTabContent, itemsLangData }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [allTabs, setAllTabs] = useState(tabs);

  const NewTabButton = (
    <div className='btn' onClick={() => createNewTab()}>
      Add new Language
    </div>
  );

  const NewTab = newTabContent;

  const createNewTab = () => {
    const newTabs = allTabs;
    newTabs.push({ name: 'New Language', content: NewTab });
    setAllTabs(newTabs);
    setActiveTabIndex(newTabs.length - 1);
  };

  const activateTab = (index) => {
    console.log(allTabs[index].content);
    setActiveTabIndex(index);
  };

  useState(() => {
    console.log('Page rerender');
  }, []);

  const activeClass =
    'text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500';
  const inactiveClass =
    'rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

  return (
    <div>
      <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
        {allTabs.map((tab, index) => (
          <li className='me-2' key={index}>
            <a
              href='#'
              className={
                'inline-block p-4 ' +
                (index === activeTabIndex ? activeClass : inactiveClass)
              }
              onClick={() => activateTab(index)}
            >
              {tab.name}
            </a>
          </li>
        ))}

        <li className='me-2'>{NewTabButton}</li>
      </ul>

      {allTabs.map((tab, index) => (
        <div
          className={`${activeTabIndex === index ? '' : 'hidden'}`}
          key={index}
        >
          {allTabs[index].content}
        </div>
      ))}
    </div>
  );
};

export default TabView;
