import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ticketsReducer from '../features/tickets/ticketsSlice';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice';
import appbarReducer from '../features/appbar/appbarSlice';


export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    user: userReducer,
    theme: themeReducer,
    appbar: appbarReducer,
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
