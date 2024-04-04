export const Button = ({ label }) =>
{
  return (
    <>
      <button
        type="button"
        className="cursor-pointer select-none  disabled:cursor-not-allowed disabled:opacity-75 disabled:pointer-events-none
        duration-300 transition-all rounded-xl text-lg  px-9 py-3 sm:py-[0.875rem] sm:text-p1 sm:font-semibold text-neutral-900 border-2 border-transparent
        bg-[#3bd6f0] shadow-md transition-all duration-500 bg-size-200  w-full sm:w-auto sm:min-w-[270px] 
        hover:bg-gradient-to-br from-[#3bd6f0]   to-[#1fce1c]">
        <span>{label}</span>
      </button>
    </>
  );
};

export const ButtonOutline = ({ label }) =>
{
  return (
    <button
      type="button"
      className="cursor-pointer select-none font-body disabled:cursor-not-allowed disabled:opacity-75 
    disabled:pointer-events-none sm:font-semibold	duration-300 transition-all rounded-xl text-p2 px-9 py-3 sm:py-[0.875rem] 
    font-medium bg-neutral-50 text-neutral-900 border-2  sm:text-p1 border-[#1CCFB9] hover:bg-accent-100 focus:ring-accent-500 
    shadow-md dark:bg-neutral-800 dark:text-neutral-50 dark:hover:text-neutral-50 dark:hover:bg-accent-500 dark:hover:bg-opacity-10 
    w-full sm:w-auto sm:min-w-[270px]"><span>{label}</span></button>
  );
}

