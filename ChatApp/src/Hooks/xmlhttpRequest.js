import uuid from 'react-native-uuid';
import {storage} from '../../config';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';

export default function useUploadImage() {
  const uploadImage = async ({uri}) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const fileRef = ref(storage, uuid.v4());
    const resultUpload = await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
  };
  return {uploadImage};
}
