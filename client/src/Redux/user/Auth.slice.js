import {createSlice} from '@reduxjs/toolkit';

//setting initail state
const initialState = {
    currentUser: null,
    error: null,
    loading: null,
    isLoggedIn: false
};

//setting the user slice 
const userSlice = createSlice({
    name: 'user',
    initialState,

    //creating the reducers
    reducers:{
        SET_LOGIN(state, action) {
              state.isLoggedIn = action.payload;
        },
        signInStart: (state)=>{
          state.loading = true
        },
        signInSuccess: (state, action)=>{
            state.currentUser = action.payload,
            state.loading = true,
            state.error = null
        },
        signInFailure: (state, action)=>{
            state.error = action.payload,
            state.loading = false
        },
        updateUserStart: (state)=>{
         state.loading = true 
        },
        updateUserSuccess: (state, action)=>{
            state.currentUser =  action.payload;
            state.loading = false;
            state.error = null
        },
        updateUserFailure: (state, action)=>{
            state.error = action.payload
            state.loading = false
        },
        // deleteUserStart: (state)=>{
        //     state.loading = true;
        // },
        // deleteUserSuccess: (state)=>{
        //    state.currentUser = null;
        //    state.loading = false;
        //    state.error = null;
        // },
        // deleteUserFailure: (state, action)=>{
        //     state.error = action.payload;
        //     state.loading = false
        // },
        signoutUserStart: (state)=>{
            state.loading = true;
        },
        signoutUserSuccess: (state)=>{
           state.currentUser = null;
           state.loading = false;
           state.error = null;
        },
        signoutUserFailure: (state, action)=>{
            state.error = action.payload;
            state.loading = false
        },
        profileStart: (state)=>{
            state.loading = true
          },
          profileSuccess: (state, action)=>{
              state.currentUser = action.payload,
              state.loading = true,
              state.error = null
          },
          profileFailure: (state, action)=>{
              state.error = action.payload,
              state.loading = false
          },
          updateProfileStart: (state)=>{
              state.loading = true
            },
            updateProfileSuccess: (state, action)=>{
                state.currentUser = action.payload,
                state.loading = true,
                state.error = null
            },
            updateProfileFailure: (state, action)=>{
                state.error = action.payload,
                state.loading = false
            },
    }
})


export const {
    signInStart, 
    signInSuccess, 
    signInFailure, 
    updateUserFailure, 
    updateUserStart, 
    updateUserSuccess,
    deleteUserFailure, 
    deleteUserStart,
    deleteUserSuccess,
    signoutUserStart,
    signoutUserSuccess,
    signoutUserFailure,
    profileFailure,
    profileStart,
    profileSuccess, 
    updateProfileFailure,
    updateProfileStart, 
    updateProfileSuccess,
    SET_LOGIN
} = userSlice.actions;

export default userSlice.reducer;