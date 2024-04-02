import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <TailSpin
      height='80'
      width='80'
      color='#3056d3'
      ariaLabel='tail-spin-loading'
      radius='1'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  );
};

export default Loader;
