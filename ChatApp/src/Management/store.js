import {configureStore} from '@reduxjs/toolkit';
import chatSlice from './Features/chatSlice';
import themeSlice from './Features/themeSlice';
import userSlice from './Features/userSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: userSlice,
    chat: chatSlice,
  },
});
