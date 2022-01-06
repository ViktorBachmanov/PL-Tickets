//import { useContext } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";

import { Priority, RequestStatus } from "./types";
import { db, collectionName } from '../user/init';


interface initialState {
  status: RequestStatus;
  list: Array<TicketData>;
}

const initialState = {
    status: RequestStatus.IDLE,
    list: [],
};

export interface TicketData {
  title: string;
  description: string;
  priority: Priority;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isCompleted: boolean;
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

export const getAllTickets = createAsyncThunk(
  'tickets/getAllTickets',
  async (data: TicketData) => {
    const tickets: any = [];    
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tickets.push({
        title: doc.data().title,
        description: doc.data().description,
        priority: doc.data().priority,
        authorId: doc.data().authorId,
        authorName: doc.data().authorName,
        createdAt: doc.data().createdAt.seconds,
        updatedAt: doc.data().updatedAt.seconds,
        isCompleted: doc.data().isCompleted,
      });
    });
    // The value we return becomes the `fulfilled` action payload
    return tickets;
  }
);


export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
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
          .addCase(getAllTickets.fulfilled, (state, action) => {
            state.status = RequestStatus.DONE;
            state.list = action.payload;
            console.log('getAllTickets done');
          })
      }
});


export default ticketsSlice.reducer;