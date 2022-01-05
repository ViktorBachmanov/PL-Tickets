import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ticketsReducer from '../features/tickets/ticketsSlice';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tickets: ticketsReducer,
    user: userReducer,
    theme: themeReducer,
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
