import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ticketsReducer from '../features/tickets/ticketsSlice';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice';
import titleReducer from '../features/title/titleSlice';


export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    user: userReducer,
    theme: themeReducer,
    title: titleReducer,
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
