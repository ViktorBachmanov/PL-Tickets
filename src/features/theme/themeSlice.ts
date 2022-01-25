import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LightStatus } from './types';
import { viewRep } from '../../constants';

interface ThemeState {
  lightStatus: LightStatus;
  view: string;
}

const initialState: ThemeState = {
  lightStatus: window.matchMedia('(prefers-color-scheme: dark)').matches ? LightStatus.DARK : LightStatus.LIGHT,
  view: viewRep.list,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setLightStatus: (state, action: PayloadAction<LightStatus>) => {
      state.lightStatus = action.payload;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
  },
});

export const { setLightStatus, setView } = themeSlice.actions;

export default themeSlice.reducer;
