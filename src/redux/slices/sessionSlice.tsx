import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getDataByFieldValue } from "@/firebase/firestore/data";

export interface SessionState {
  user: User | null;
}

const initialState: SessionState = {
  user: null,
};

export const setUserData = createAsyncThunk("setUserData", async (email) => {

  const user = await getDataByFieldValue('users', "email",email)

  return user;
})

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
      getUser: () => state ,
      
    },

    extraReducers : (builder) => {
      builder
      .addCase(setUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
    }
  });

  
  export const { getUser } = sessionSlice.actions;
  export default sessionSlice.reducer;  