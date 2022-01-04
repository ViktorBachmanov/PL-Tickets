//import { useContext } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { Priority } from "./types";
import { db, collectionName } from '../user/init';



/*
const initialState = {
    value: 0,
    status: 'idle',
};*/

export interface TicketData {
  title: string;
  description: string;
  priority: Priority;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const saveInDatabase = createAsyncThunk(
    'tickets/saveInDatabase',
    async (data: TicketData) => {
      
      const docRef = await addDoc(collection(db, collectionName), data);
      // The value we return becomes the `fulfilled` action payload
      console.log(docRef);
      console.log(docRef.id);
      return docRef.id;
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