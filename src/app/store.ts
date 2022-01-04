import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ticketsReducer from '../features/tickets/ticketsSlice';
import firebaseReducer from '../features/firebase/firebaseSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tickets: ticketsReducer,
    firebase: firebaseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
