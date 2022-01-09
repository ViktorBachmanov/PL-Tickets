//import { useContext } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import { collection, addDoc, setDoc, getDocs, doc, Timestamp } from "firebase/firestore";

import { Priority, RequestStatus } from "./types";
import { db, collectionName } from '../user/init';


interface initialState {
  requestStatus: RequestStatus;
  list: Array<TicketCardData>;
  beingSavedTicketId: string;
}

const initialState = {
    requestStatus: RequestStatus.IDLE,
    list: [defaultTicketData()],
    beingSavedTicketId: "",
};

interface TaskData {
  title: string;
  description: string;
  priority: Priority;
  authorId: string;
  authorName: string | null;
  isCompleted: boolean;
}

interface FireDocData extends TaskData {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TicketCardData extends TaskData {
  createdAt: number;  // milliseconds
  updatedAt: number;
  id: string;
}



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const saveDocInDatabase = createAsyncThunk(
  'tickets/saveDocInDatabase',
  async (payload: { id: string, docData: FireDocData }) => {
    if(!payload.id) { 
      const docRef = await addDoc(collection(db, collectionName), payload.docData);
      // The value we return becomes the `fulfilled` action payload
      console.log(docRef);
      console.log(docRef.id);
      return docRef.id;
    }
    else {
      await setDoc(doc(db, collectionName, payload.id), payload.docData);

      return payload.id;
    }
  }
);

export const getAllTickets = createAsyncThunk(
  'tickets/getAllTickets',
  async (data: FireDocData) => {
    const tickets: any = [];    
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docData = doc.data();
      console.log(doc.id, " => ", docData);
      
      tickets.push({
        id: doc.id,
        title: docData.title,
        description: docData.description,
        priority: docData.priority,
        authorId: docData.authorId,
        authorName: docData.authorName,
        isCompleted: docData.isCompleted,
        createdAt: docData.createdAt.toMillis(),
        updatedAt: docData.updatedAt.toMillis(),
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
      resetSavedTicketId: (state) => {
        state.beingSavedTicketId = "";
      },
    },
    extraReducers(builder) {
        builder
          .addCase(saveDocInDatabase.pending, (state, action) => {
            //state.status = 'loading'
            state.beingSavedTicketId = "";
            state.requestStatus = RequestStatus.LOADING;
          })
          .addCase(saveDocInDatabase.fulfilled, (state, action) => {
            //state.status = 'succeeded'
            //state.posts = state.posts.concat(action.payload)
            state.beingSavedTicketId = action.payload;
            state.requestStatus = RequestStatus.DONE;
          })
          .addCase(saveDocInDatabase.rejected, (state, action) => {
            //state.status = 'failed'
            //state.error = action.error.message
            console.error(action.error.message);
          })
          .addCase(getAllTickets.fulfilled, (state, action) => {
            state.requestStatus = RequestStatus.DONE;
            state.list = action.payload;
            console.log('getAllTickets done');
          })
      }
});

export const { resetSavedTicketId } = ticketsSlice.actions;

export default ticketsSlice.reducer;


// helper functions

export function getTicketDataById(tickets: Array<TicketCardData>, id: string): TicketCardData | undefined {
  const ticket: TicketCardData | undefined = tickets.find(ticket => {
    return ticket.id === id;
  });

  return ticket ? {...ticket} : undefined;
}

export function defaultTicketData(): TicketCardData {
  const defaultTicketData = {
      id: "",
      title: "Title *",
      description: "Description",
      priority: Priority.NORMAL,
      authorId: "",
      authorName: "",
      createdAt: 0,
      updatedAt: 0,
      isCompleted: false
  }

  return defaultTicketData;
}