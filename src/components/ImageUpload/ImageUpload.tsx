import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { getFile, uploadFile } from '@/lib/storage';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const ImageUpload = ({ folderName, updateImageUrl }) => {
  const [file, setFile] = useState(null);

  const [uploaded, setUploaded] = useState(null);

  const handleChange = async (file) => {
    setFile(file);
    const folder = folderName;
    const imagePath = await uploadFile(file, folder);
    const imageUrl = await getFile(imagePath);
    setUploaded(imageUrl);
    updateImageUrl(imageUrl);
  };

  return (
    <>
      <FileUploader handleChange={handleChange} name='file' types={fileTypes} />
      {/* {uploaded && <img src={uploaded} className='my-5 max-w-[400px]' />} */}
    </>
  );
};

export default ImageUpload;
