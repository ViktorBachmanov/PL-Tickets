import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { RootState, AppThunk } from '../../app/store';
import { LightStatus } from "./types";

interface ThemeState {
  //lightStatus: 'light' | 'dark' | undefined;
  lightStatus: LightStatus;
}

const initialState: ThemeState = {
  lightStatus: LightStatus.LIGHT,
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
      state.lightStatus = LightStatus.DARK;
    },
    lighten: (state) => {
      state.lightStatus = LightStatus.LIGHT;
    },
    
  },

});

export const { darken, lighten } = themeSlice.actions;

export default themeSlice.reducer;
