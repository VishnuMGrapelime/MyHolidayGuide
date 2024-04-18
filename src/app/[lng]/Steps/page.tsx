import React from 'react'
import 'flowbite/dist/flowbite.min.css';

function page() {
  return (
    
    <div>
    <section className='dark:text-neutral-50 dark:bg-[#0f1b38] h-[200px]'>
    <div className='container mx-auto w-1/2'> 
        <div className='p-4 leading-8 '>
            <div className=''>
                <div className='flex justify-between'>
                    <span>Organization name:</span>
                    <span>ABC ORGANIZATIONS</span>
                </div>
                <div className='flex justify-between'>
                    <span>Organization email:</span>
                    <span>mail@mail.gmail.com</span>
                </div>
                <div className='flex justify-between'>
                    <span>Organization name:</span>
                    <span>123 INDUSTRIES</span>
                </div>
               
            </div>
        </div>
        <div className='grid grid-cols-2 divide-x divide-solid'>
          <button>/</button>
        </div>
    </div>
</section>


    </div>
  )
}

export default page