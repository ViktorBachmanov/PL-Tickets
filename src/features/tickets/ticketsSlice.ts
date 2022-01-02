//import { useContext } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import { collection, addDoc } from "firebase/firestore";

import { IFormInput } from "./types";


/*
const initialState = {
    value: 0,
    status: 'idle',
};*/



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const saveInDatabase = createAsyncThunk(
    'tickets/saveInDatabase',
    async (db: any) => {
      
      const docRef = await addDoc(collection(db, "collection-1"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      // The value we return becomes the `fulfilled` action payload
      return docRef;
    }
);


export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: [],
    reducers: {
    },
    extraReducers(builder) {
        builder
          .addCase(saveInDatabase.pending, (state, action) => {
            //state.status = 'loading'
          })
          .addCase(saveInDatabase.fulfilled, (state, action) => {
            //state.status = 'succeeded'
            //state.posts = state.posts.concat(action.payload)
          })
          .addCase(saveInDatabase.rejected, (state, action) => {
            //state.status = 'failed'
            //state.error = action.error.message
            console.error(action.error.message);
          })
      }
});


export default ticketsSlice.reducer;