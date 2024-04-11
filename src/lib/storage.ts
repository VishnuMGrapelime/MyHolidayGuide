import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';

import { storage } from '@/firebase/firebase';

export const uploadFile = async (file: any, folder: any) => {
  let errors = null;
  try {
    const filename = nanoid();
    const storageRef = ref(
      storage,
      `${folder}${filename}.${file.name.split('.').pop()}`,
    );
    const res = await uploadBytes(storageRef, file);

    return res.metadata.fullPath;
  } catch (error) {
    errors = error;
    throw error;
  }
};

export const getFile = async (path: any) => {
  let errors = null;
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    errors = error;
    throw error;
  }
};
