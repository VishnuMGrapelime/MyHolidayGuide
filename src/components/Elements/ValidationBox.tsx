export const ValidationBox = ({ errors }) => {
  return (
    <div className='flex flex-col gap-y-2 p-3 my-4 md:p-4 text-danger-500 border rounded-xl border-danger-500 break-words'>
      <h3 className='text-p1 font-semibold'>
        There are problems with the input to resolve:
      </h3>
      <div className='flex flex-wrap gap-2 text-p3'>
        <div className='w-full'></div>
        <div className='w-full'>
          <>
            {Object.keys(errors).map((key) => (
              <div key={key} className='flex flex-wrap gap-2 text-p3'>
                <div className='w-full'>
                  <p>{errors[key]}</p>
                </div>
                <div className='w-full'></div>
              </div>
            ))}
          </>
        </div>
      </div>
      <div></div>
    </div>
  );
};
