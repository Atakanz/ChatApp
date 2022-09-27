import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './Features/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
