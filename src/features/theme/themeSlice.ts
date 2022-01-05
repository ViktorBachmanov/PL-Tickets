import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

interface ThemeState {
  lightStatus: 'light' | 'dark' | undefined;
}

const initialState: ThemeState = {
  lightStatus: 'light',
};


export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    darken: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.lightStatus = "dark";
    },
    lighten: (state) => {
      state.lightStatus = "light";
    },
    
  },

});

export const { darken, lighten } = themeSlice.actions;

export default themeSlice.reducer;
