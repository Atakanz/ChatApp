import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentChat: null,
  allChatRooms: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setAllChatRooms: (state, action) => {
      state.allChatRooms = [...state.allChatRooms, action.payload];
      //   state.allChatRooms = action.payload;
    },
  },
});

export const {setCurrentChat, setAllChatRooms} = chatSlice.actions;

export default chatSlice.reducer;
