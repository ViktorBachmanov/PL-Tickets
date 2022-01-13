//import { useContext } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import { collection, addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

import { Priority, Status, TicketCardData, FireDocData } from "./types";
import { RequestStatus } from "../../constants";
import { db } from '../../config';
import { ticketsCollection, countersCollection, docsCounterDocId } from '../../config';



interface initialState {
  requestStatus: RequestStatus;
  list: Array<TicketCardData>;
  beingSavedTicketId: string;
  currentTicket: TicketCardData;
  status: Status;
  counter: number;
}

const initialState = {
    requestStatus: RequestStatus.IDLE,
    list: [defaultTicketData()],
    beingSavedTicketId: "",
    currentTicket: defaultTicketData(),
    status: Status.NONE,
    counter: 0,
};





// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const saveDocInDatabase = createAsyncThunk(
  'tickets/saveDocInDatabase',
  async (payload: { id: string, docData: FireDocData }, { dispatch }) => {
    if(!payload.id) { 
      const docRef = await addDoc(collection(db, ticketsCollection), payload.docData);
      // The value we return becomes the `fulfilled` action payload
      console.log(docRef);
      console.log(docRef.id);
      dispatch(loadTicketById(docRef.id));
      dispatch(modifyDocsCounter(true));
      return docRef.id;
    }
    else {
      await setDoc(doc(db, ticketsCollection, payload.id), payload.docData);
      dispatch(loadTicketById(payload.id));
      return payload.id;
    }
  }
);

export const deleteTicket = createAsyncThunk(
  'pagination/deleteTicket',
  async (ticketId: string, { dispatch }) => {
    await deleteDoc(doc(db, ticketsCollection, ticketId));

    dispatch(modifyDocsCounter(false));

    // The value we return becomes the `fulfilled` action payload
    return;
  }
);

const modifyDocsCounter = createAsyncThunk(
  'tickets/modifyDocsCounter',
  async (isIncrement: boolean) => {
      
      const docRef = doc(db, countersCollection, docsCounterDocId);
      const docSnap = await getDoc(docRef);

      let val = 0;
      if (docSnap.exists()) {
        val = docSnap.data().total;
        if(isIncrement) {
           ++val;
        }
        else {
           --val;
        }
      
        setDoc(docRef, { total: val });        
      } 

      return { val, isIncrement };
  }
);

export const getTotalDocs = createAsyncThunk(
  'tickets/getTotalDocs',
  async () => {
      // The value we return becomes the `fulfilled` action payload
      const docRef = doc(db, countersCollection, docsCounterDocId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().total;        
      } 
  }
);

export const loadTicketById = createAsyncThunk(
  'tickets/loadTicketById',
  async (id: string) => {
      // The value we return becomes the `fulfilled` action payload
      const docRef = doc(db, ticketsCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        return createTicketData(id, docSnap.data() as FireDocData);
      } else {
        // doc.data() will be undefined in this case
        //console.log("No such document!");
        return defaultTicketData();
      }
  }
);

export const getAllTickets = createAsyncThunk(
  'tickets/getAllTickets',
  async (data: FireDocData) => {
    const tickets: any = [];    
    //const querySnapshot = await getDocs(collection(db, ticketsCollection));
    const myQuery = query(collection(db, ticketsCollection), orderBy("updatedAt"));
    const documentSnapshots = await getDocs(myQuery);

    documentSnapshots.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docData = doc.data();
      //console.log(doc.id, " => ", docData);
      
      
      tickets.push(createTicketData(doc.id, docData as FireDocData));
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
      resetRequestStatus: (state) => {
        state.requestStatus = RequestStatus.IDLE;
      },
      resetStatus: (state) => {
        state.status = Status.NONE;
      },
      resetCurrentTicket: (state) => {
        state.currentTicket = defaultTicketData();
      },
    },
    extraReducers(builder) {
        builder
          .addCase(saveDocInDatabase.pending, (state, action) => {
            //state.status = 'loading'
            state.beingSavedTicketId = "";
            state.currentTicket = defaultTicketData();
            state.requestStatus = RequestStatus.LOADING;
          })
          .addCase(saveDocInDatabase.fulfilled, (state, action) => {
            //state.status = 'succeeded'
            //state.posts = state.posts.concat(action.payload)
            state.beingSavedTicketId = action.payload;
            //state.requestStatus = RequestStatus.IDLE;
            state.status = Status.SAVED;
            
          })
          .addCase(saveDocInDatabase.rejected, (state, action) => {
            //state.status = 'failed'
            //state.error = action.error.message
            console.error(action.error.message);
          })
          .addCase(loadTicketById.pending, (state, action) => {
            //state.status = 'loading'
            state.requestStatus = RequestStatus.LOADING;
          })
          .addCase(loadTicketById.fulfilled, (state, action) => {
            //state.status = 'succeeded'
            //state.posts = state.posts.concat(action.payload)
            state.requestStatus = RequestStatus.IDLE;
            state.status = Status.LOADED;
            state.currentTicket = action.payload;
          })
          .addCase(loadTicketById.rejected, (state, action) => {
            console.error(action.error.message);
          })
          .addCase(getTotalDocs.pending, (state, action) => {
            //state.status = 'loading'
            state.counter = 0; 
            state.requestStatus = RequestStatus.LOADING;
          })
          .addCase(getTotalDocs.fulfilled, (state, action) => {
            state.counter = action.payload;            
          })
          .addCase(getTotalDocs.rejected, (state, action) => {
            console.error(action.error.message);
          })
          .addCase(deleteTicket.pending, (state, action) => {
            //state.status = 'loading'
            state.requestStatus = RequestStatus.LOADING;
          })
          .addCase(deleteTicket.fulfilled, (state, action) => {
            state.requestStatus = RequestStatus.IDLE;
            //state.status = Status.DELETED;            
          })
          .addCase(deleteTicket.rejected, (state, action) => {
            state.requestStatus = RequestStatus.IDLE;
            console.error(action.error.message);
          })
          .addCase(modifyDocsCounter.pending, (state, action) => {
            //state.status = 'loading'
            state.requestStatus = RequestStatus.LOADING;
          })
          .addCase(modifyDocsCounter.fulfilled, (state, action) => {
            state.requestStatus = RequestStatus.IDLE;
            const { val, isIncrement } = action.payload;
            state.counter = val;
            if(!isIncrement) {
              state.status = Status.DELETED;   
            }       
          })
          .addCase(modifyDocsCounter.rejected, (state, action) => {
            state.requestStatus = RequestStatus.IDLE;
            console.error(action.error.message);
          })
          .addCase(getAllTickets.fulfilled, (state, action) => {
            state.requestStatus = RequestStatus.IDLE;
            state.list = action.payload;
            //console.log('getAllTickets IDLE');
          })
      }
});

export const { resetSavedTicketId, resetRequestStatus, resetStatus, resetCurrentTicket } = ticketsSlice.actions;

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

export function createTicketData(id: string, docData: FireDocData): TicketCardData {
  return {
    id,
    title: docData.title,
    description: docData.description,
    priority: docData.priority,
    authorId: docData.authorId,
    authorName: docData.authorName,
    isCompleted: docData.isCompleted,
    createdAt: docData.createdAt.toMillis(),
    updatedAt: docData.updatedAt.toMillis(),
  };
}