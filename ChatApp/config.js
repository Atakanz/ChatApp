import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAkAW56zhOZD7_fy7hEGu7741580ex98OA',
  authDomain: 'intouch-31c37.firebaseapp.com',
  projectId: 'intouch-31c37',
  storageBucket: 'intouch-31c37.appspot.com',
  messagingSenderId: '142148244290',
  appId: '1:142148244290:web:583aafc3edbb4e55336edb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
