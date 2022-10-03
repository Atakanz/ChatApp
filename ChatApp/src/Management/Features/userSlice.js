import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: [],
  allUsers: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    logIn: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem('savedUser', JSON.stringify(action.payload));
    },
    logOut: (state, action) => {
      AsyncStorage.removeItem('savedUser');
      state.user = action.payload;
    },
  },
});

export const {setUser, setAllUsers, logIn, logOut} = userSlice.actions;

export default userSlice.reducer;
