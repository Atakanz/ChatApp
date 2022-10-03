import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allChatRooms: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setAllChatRooms: (state, action) => {
      state.allChatRooms = action.payload;
    },
  },
});

export const {setAllChatRooms} = chatSlice.actions;

export default chatSlice.reducer;
