import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit';
import chatSlice from './Features/chatSlice';
import themeSlice from './Features/themeSlice';
import userSlice from './Features/userSlice';
import {Iterable} from 'immutable';

const isSerializable = value => Iterable.isIterable(!value) || isPlain(!value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  warnAfter: 128,
  isSerializable,
});

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: userSlice,
    chat: chatSlice,
  },
  middleware: [serializableMiddleware],
});
