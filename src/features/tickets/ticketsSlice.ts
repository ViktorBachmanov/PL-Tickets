//import { useContext } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  OrderByDirection,
  Timestamp,
  where,
} from "firebase/firestore";

import { Priority, TicketCardData, FireDocData } from "./types";
import { RequestStatus, Storage } from "../../constants";
import { db } from "../../config";
import {
  ticketsCollection,
  countersCollection,
  docsCounterDocId,
} from "../../config";
import { ticketsPerPageOptions } from "./constants";

interface initialState {
  requestStatus: RequestStatus;
  list: Array<TicketCardData>;
  currentTicket: TicketCardData;
  counter: number;

  ticketsPerPage: number;
  currentPage: number;
  priorityOrder: OrderByDirection;
  dateOrder: OrderByDirection;
}

let initialState: initialState = {
  requestStatus: RequestStatus.IDLE,
  list: [defaultTicketData()],
  currentTicket: defaultTicketData(),
  counter: 0,

  ticketsPerPage: ticketsPerPageOptions[2],
  currentPage: 0,
  priorityOrder: "asc",
  dateOrder: "desc",
};

const storageStateOptions = localStorage.getItem(Storage.PAGINATION_ORDER_DATA);
if (storageStateOptions) {
  initialState = {
    ...initialState,
    ...JSON.parse(storageStateOptions),
  };
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const saveDocInDatabase = createAsyncThunk(
  "tickets/saveDocInDatabase",
  async (payload: { id: string; docData: FireDocData }, { dispatch }) => {
    if (!payload.id) {
      const docRef = await addDoc(
        collection(db, ticketsCollection),
        payload.docData
      );
      // The value we return becomes the `fulfilled` action payload
      dispatch(loadTicketById(docRef.id));
      dispatch(modifyDocsCounter(true));
      return docRef.id;
    } else {
      await setDoc(doc(db, ticketsCollection, payload.id), payload.docData);
      dispatch(loadTicketById(payload.id));
      return payload.id;
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (ticketId: string, { dispatch }) => {
    await deleteDoc(doc(db, ticketsCollection, ticketId));

    dispatch(modifyDocsCounter(false));

    // The value we return becomes the `fulfilled` action payload
    return;
  }
);

const modifyDocsCounter = createAsyncThunk(
  "tickets/modifyDocsCounter",
  async (isIncrement: boolean) => {
    const docRef = doc(db, countersCollection, docsCounterDocId);
    const docSnap = await getDoc(docRef);

    let val = 0;
    if (docSnap.exists()) {
      val = docSnap.data().total;
      if (isIncrement) {
        ++val;
      } else {
        --val;
      }

      setDoc(docRef, { total: val });
    }

    return { val, isIncrement };
  }
);

export const getTotalDocs = createAsyncThunk(
  "tickets/getTotalDocs",
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
  "tickets/loadTicketById",
  async (id: string) => {
    // The value we return becomes the `fulfilled` action payload
    const docRef = doc(db, ticketsCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return createTicketData(id, docSnap.data() as FireDocData);
    } else {
      // doc.data() will be undefined in this case
      //console.log("No such document!");
      return defaultTicketData();
    }
  }
);

export const getTicketsForLastDays = createAsyncThunk(
  "tickets/getTicketsForLastDays",
  // period = last days
  async (period?: number) => {
    const tickets: Array<TicketCardData> = [];

    let myQuery;

    if (period) {
      const date = Date.now() - period * 24 * 60 * 60 * 1000; // milliseconds
      const timestamp = new Timestamp(date / 1000, 0);
      myQuery = query(
        collection(db, ticketsCollection),
        where("updatedAt", ">=", timestamp),
        orderBy("updatedAt")
      );
    } else {
      myQuery = query(collection(db, ticketsCollection), orderBy("updatedAt"));
    }
    const documentSnapshots = await getDocs(myQuery);

    documentSnapshots.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docData = doc.data();

      tickets.push(createTicketData(doc.id, docData as FireDocData));
    });
    // The value we return becomes the `fulfilled` action payload
    return tickets;
  }
);

export const loadPage = createAsyncThunk(
  "tickets/loadPage",
  async (empty, { getState }) => {
    const rootState = getState() as RootState;
    const { ticketsPerPage, currentPage, priorityOrder, dateOrder } =
      rootState.tickets;
    let documentSnapshots;

    if (currentPage === 0) {
      const onlyQuery = query(
        collection(db, ticketsCollection),
        orderBy("priority", priorityOrder),
        orderBy("updatedAt", dateOrder),
        limit(ticketsPerPage)
      );
      documentSnapshots = await getDocs(onlyQuery);
    } else {
      const first = query(
        collection(db, ticketsCollection),
        orderBy("priority", priorityOrder),
        orderBy("updatedAt", dateOrder),
        limit(ticketsPerPage * currentPage)
      );
      documentSnapshots = await getDocs(first);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const next = query(
        collection(db, ticketsCollection),
        orderBy("priority", priorityOrder),
        orderBy("updatedAt", dateOrder),
        startAfter(lastVisible),
        limit(ticketsPerPage)
      );
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

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    resetRequestStatus: (state) => {
      state.requestStatus = RequestStatus.IDLE;
    },
    resetCurrentTicket: (state) => {
      state.currentTicket = defaultTicketData();
    },
    setCurrentTicketById: (state, action: PayloadAction<string>) => {
      const ticket = getTicketDataById(state.list, action.payload);
      if (ticket) {
        state.currentTicket = ticket;
      }
    },
    setTicketsPerPage: (state, action: PayloadAction<number>) => {
      state.ticketsPerPage = action.payload;
      state.currentPage = 0;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    togglePriorityOrder: (state) => {
      state.priorityOrder = state.priorityOrder === "asc" ? "desc" : "asc";
    },
    toggleDateOrder: (state) => {
      state.dateOrder = state.dateOrder === "asc" ? "desc" : "asc";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveDocInDatabase.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(saveDocInDatabase.rejected, (_state, action) => {
        console.error(action.error.message);
      })
      .addCase(loadTicketById.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(loadTicketById.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.IDLE;
        state.currentTicket = action.payload;
      })
      .addCase(loadTicketById.rejected, (_state, action) => {
        console.error(action.error.message);
      })
      .addCase(getTotalDocs.pending, (state) => {
        state.counter = 0;
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(getTotalDocs.fulfilled, (state, action) => {
        state.counter = action.payload;
        state.requestStatus = RequestStatus.IDLE;
      })
      .addCase(getTotalDocs.rejected, (_state, action) => {
        console.error(action.error.message);
      })
      .addCase(deleteTicket.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.requestStatus = RequestStatus.IDLE;
        console.error(action.error.message);
      })
      .addCase(modifyDocsCounter.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.IDLE;
        const { val } = action.payload;
        state.counter = val;
      })
      .addCase(modifyDocsCounter.rejected, (state, action) => {
        state.requestStatus = RequestStatus.IDLE;
        console.error(action.error.message);
      })
      .addCase(getTicketsForLastDays.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(getTicketsForLastDays.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.IDLE;
        state.list = action.payload;
      })
      .addCase(getTicketsForLastDays.rejected, (_state, action) => {
        console.error(action.error.message);
      })
      .addCase(loadPage.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(loadPage.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.IDLE;
        state.list = action.payload;
      })
      .addCase(loadPage.rejected, (_state, action) => {
        console.error(action.error.message);
      });
  },
});

export const {
  setCurrentTicketById,
  resetRequestStatus,
  resetCurrentTicket,
  setTicketsPerPage,
  setCurrentPage,
  togglePriorityOrder,
  toggleDateOrder,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;

// helper functions

function getTicketDataById(
  tickets: Array<TicketCardData>,
  id: string
): TicketCardData | undefined {
  const ticket: TicketCardData | undefined = tickets.find((ticket) => {
    return ticket.id === id;
  });

  return ticket ? { ...ticket } : undefined;
}

export function defaultTicketData(): TicketCardData {
  const defaultTicketData = {
    id: "",
    title: "",
    description: "",
    priority: Priority.NONE,
    authorId: "",
    authorName: "",
    createdAt: 0,
    updatedAt: 0,
    isCompleted: false,
  };

  return defaultTicketData;
}

export function createTicketData(
  id: string,
  docData: FireDocData
): TicketCardData {
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
