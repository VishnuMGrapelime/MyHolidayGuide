import { ChevronUp } from 'lucide-react'
// import React from 'react'

const  ScrollToTopButton = () => {
  return (
    <button
    // onClick={scrollToTop}
    className="fixed bottom-4 right-4 p-2 bg-[#1CCFB9]  rounded-full shadow-md hover:bg-[#10EED2]"
  >
    <div className=''>
      <ChevronUp size={25} />
    </div>
  </button>
  )
}

export default ScrollToTopButton