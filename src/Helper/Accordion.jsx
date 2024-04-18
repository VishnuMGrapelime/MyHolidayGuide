import React, { useEffect } from 'react';


const Accordion = ({}) => {
  useEffect(() => {
    var accItem = document.getElementsByClassName('accordionItem');
    var accHD = document.getElementsByClassName('accordionItemHeading');
    
    for (let i = 0; i < accHD.length; i++) {
      accHD[i].addEventListener('click', toggleItem, false);
    }

    function toggleItem() {
      var itemClass = this.parentNode.className;
      
      for (let i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
      }
      
      if (itemClass === 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
      }
    }
  }, []);

  return (
    <div className="accordionWrapper">
      <div className="accordionItem open">
        <h2 className="accordionItemHeading">
          <span>title</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </h2>
        <div className="accordionItemContent">
    <div className="divide-y divide-solid space-y-4">
        {/* First group */}
        <div className='space-y-2'>
            <div className='tracking-wide'>
                <p className=''>Country Name</p>
            </div>
            <div className='tracking-wide'>
                <p className=''>Country Name</p>
            </div>
            <div className='tracking-wide'>
                <p className=''>Country Name</p>
            </div>
            <div className='tracking-wide flex items-center justify-between'>
                <p className=''>Country Name</p>
                <p className=''>Country Name</p>
            </div>
        </div>

  

        {/* Second group */}
        <div className='space-y-2'>
            <div className='tracking-wide'>
                <p className='mt-4'>Country Name</p>
            </div>
            <div className='tracking-wide'>
                <p className=''>Country Name</p>
            </div>
            <div className='tracking-wide'>
                <p className=''>Country Name</p>
            </div>
            <div className='tracking-wide'>
                <p className=''>Country Name</p>
            </div>
        </div>

 

        {/* Third group */}
        <div className='space-y-2'>
            <div className='tracking-wide'>
                <p className='mt-4'>Country Name</p>
            </div>
            <div className='tracking-wide'>
                <p className=''>Country Name</p>
            </div>
        </div>

        <div className='space-y-2'>
        <button
        type="submit"
        className="cursor-pointer select-none  disabled:cursor-not-allowed disabled:opacity-75 disabled:pointer-events-none
        rounded-xl text-xl py-2   text-neutral-900 border-2 border-transparent
        shadow-md w-full uppercase  bg-[#1CCFB9] hover:bg-[#4effe9]">
        <span>{'Show organisation data'}</span>
      </button>
      <button
        type="submit"
        className="cursor-pointer select-none  disabled:cursor-not-allowed disabled:opacity-75 disabled:pointer-events-none
        rounded-xl text-xl  py-2   text-neutral-900 border-2 border-transparent
        shadow-md w-full uppercase bg-[#1CCFB9] hover:bg-[#4effe9]">
        <span>{'Set product categories'}</span>
      </button>
        </div>
    </div>
</div>

      </div>
    </div>
  );
};

export default Accordion;
