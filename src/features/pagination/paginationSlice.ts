import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";

import { ticketsPerPageOptions, order } from "./constants";
import { loadPageActionPayload } from "./types";
import { db } from '../../config';
import { ticketsCollection } from '../../config';
import { TicketCardData, FireDocData } from "../tickets/types";
import { RequestStatus } from "../../constants";
import { createTicketData } from "../tickets/ticketsSlice";



interface PaginationState {
  ticketPerPage: number;
  orderBy: object;
  tickets: Array<TicketCardData>;
  status: RequestStatus;
}

const initialState: PaginationState = {
  ticketPerPage: ticketsPerPageOptions[2],
  orderBy: {
    priority: order.ASC,
    updatedAt: order.ASC
  },
  tickets: [],
  status: RequestStatus.IDLE,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loadPage = createAsyncThunk(
  'pagination/loadPage',
  async (payload: loadPageActionPayload) => {
    const { pageNo, docsPerPage } = payload;
    let documentSnapshots;

    if(pageNo === 0) {
      const onlyQuery = query(collection(db, ticketsCollection), orderBy("priority"), limit(docsPerPage));
      documentSnapshots = await getDocs(onlyQuery);
    }
    else {
      const first = query(collection(db, ticketsCollection), orderBy("priority"), limit(docsPerPage * pageNo));
      documentSnapshots = await getDocs(first);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      const next = query(collection(db, ticketsCollection), orderBy("priority"), startAfter(lastVisible), limit(docsPerPage));
      documentSnapshots = await getDocs(next);
    }

    const tickets: Array<TicketCardData> = []; 

    documentSnapshots.forEach((doc) => {
      tickets.push(createTicketData(doc.id, doc.data() as FireDocData));
    });

    // The value we return becomes the `fulfilled` action payload
    return tickets;
  }
);

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('increment');
      
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log('incrementByAmount');
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loadPage.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(loadPage.fulfilled, (state, action) => {
        state.status = RequestStatus.IDLE;
        state.tickets = action.payload;
      })
      .addCase(loadPage.rejected, (state, action) => {
        //state.status = 'failed'
        //state.error = action.error.message
        console.error(action.error.message);
      });
  },
});

export const { increment, incrementByAmount } = paginationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCount = (state: RootState) => state.counter.value;

export default paginationSlice.reducer;