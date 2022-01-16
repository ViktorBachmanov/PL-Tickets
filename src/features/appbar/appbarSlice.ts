import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

interface AppbarState {
  title: string;
  status: 'idle' | 'loading' | 'failed';
  isSearchDisplay: boolean;
}

const initialState: AppbarState = {
  title: "",
  status: 'idle',
  isSearchDisplay: false,
};



export const appbarSlice = createSlice({
  name: 'appbar',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.title = action.payload;
    },
    setSearchDisplay: (state, action: PayloadAction<boolean>) => {
      state.isSearchDisplay = action.payload;
    },
  },
});

export const { setTitle, setSearchDisplay } = appbarSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTitle = (state: RootState) => state.appbar.title;


export default appbarSlice.reducer;
