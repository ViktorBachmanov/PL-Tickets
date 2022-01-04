import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

//import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./init";
import { RoutesPathes } from "../../constants";

interface State {
  userId: string;
  userName: string | null;
  loginStatus: boolean;
}

const initialState: State = {
  userId: "",
  userName: "",
  loginStatus: false
}

const provider = new GoogleAuthProvider();

//const navigate = useNavigate();


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginGoogle = createAsyncThunk(
  'firebase/loginGoogle',
  async () => {    
      try {
        const result = await signInWithPopup(auth, provider)
        console.log(result.user);
        //if(result.user.displayName) {
          const payload = {
            userId: result.user.uid, 
            userName: result.user.displayName
          }
          return payload;
        //}
        
      }
      catch(error) {
        console.error('GoogleAuthProvider', error);
      }    
  }
);


export const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(loginGoogle.pending, (state, action) => {
        //state.status = 'loading'
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        //state.status = 'succeeded'
        //state.posts = state.posts.concat(action.payload)
        state.loginStatus = true;
        if(action.payload) {
          state.userId = action.payload.userId;
          state.userName = action.payload.userName;
        }
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        //state.status = 'failed'
        //state.error = action.error.message
        console.error(action.error.message);
      })
  }
  
});

//export const loginStatus = (state: RootState) => state.firebase.loginStatus;

export default firebaseSlice.reducer;
