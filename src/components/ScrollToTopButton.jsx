"use client"
import { ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ScrollToTopButton = () =>
{
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () =>
  {
    if (window.pageYOffset > 200)
    {
      setIsVisible(true);
    } else
    {
    setIsVisible(false);
    }
  };


  const scrollToTop = () =>
  {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() =>
  {
    window.addEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-2 bg-[#1CCFB9]  rounded-full shadow-md hover:bg-[#10EED2]"        >
          <div className="text-black">
            <ChevronUp size={25} />
          </div>
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton
