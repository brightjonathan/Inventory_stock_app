import {createSlice} from '@reduxjs/toolkit';

//setting initail state
const initialState = {
    UserProfile: null,
    error: null,
    loading: null,
    isLoggedIn: false
};

//setting the user slice 
const ProfileSlice = createSlice({
    name: 'profile',
    initialState,

    //creating the reducers
    reducers:{
        profileStart: (state)=>{
          state.loading = true
        },
        profileSuccess: (state, action)=>{
            state.UserProfile = action.payload,
            state.loading = true,
            state.error = null
        },
        profileFailure: (state, action)=>{
            state.error = action.payload,
            state.loading = false
        },
    }
})


export const {
    profileStart,
    profileSuccess,
    profileFailure
} = ProfileSlice.actions;


export default ProfileSlice.reducer;
