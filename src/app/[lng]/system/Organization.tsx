"use client";

import React from 'react'
import  Accordion  from '@/Helper/Accordion'
function Organization() {

 

  return (
    <div>

      <div className='space-y-3'>
        <div className="flex flex-wrap gap-4 items-center text-[11px] text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-left text-neutral-800"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
        <p className=''>system</p>&nbsp;&minus;
        <p>organization</p>
        </div>
        <div>
          <p>Organizations count : 32</p>
        </div>
        <div>
            <Accordion />
        </div>

      </div>
    </div>
  )
}

export default Organization