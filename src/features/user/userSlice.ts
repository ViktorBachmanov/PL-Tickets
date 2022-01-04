import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

//import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./init";
import { RoutesPathes } from "../../constants";

interface userData {
  id: string;
  name: string | null;
  avatarUrl: string | null;
}

interface State extends userData {
  loginStatus: boolean;
}

const initialState: State = {
  id: "",
  name: "",
  avatarUrl: null,
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
  async (arg, { dispatch }) => {    
      try {
        const result = await signInWithPopup(auth, provider)
        console.log(result.user);
        //if(result.user.displayName) {
          const payload: userData = {
            id: result.user.uid, 
            name: result.user.displayName,
            avatarUrl: result.user.photoURL
          }
          //return payload;
          dispatch(userSlice.actions.set(payload));
        //}
        
      }
      catch(error) {
        console.error('GoogleAuthProvider', error);
      }    
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    set(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.avatarUrl = action.payload.avatarUrl;

      state.loginStatus = true;
    }
    
  },
  extraReducers(builder) {
    builder
      .addCase(loginGoogle.pending, (state, action) => {
        //state.status = 'loading'
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        //state.status = 'succeeded'
        //state.posts = state.posts.concat(action.payload)
        /*
        state.loginStatus = true;
        if(action.payload) {
          state.id = action.payload.userId;
          state.name = action.payload.userName;
        }*/
        
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        //state.status = 'failed'
        //state.error = action.error.message
        console.error(action.error.message);
      })
  }
  
});

//export const loginStatus = (state: RootState) => state.firebase.loginStatus;

export default userSlice.reducer;
