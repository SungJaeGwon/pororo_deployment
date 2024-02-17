import { createSlice } from "@reduxjs/toolkit";

const initState = {
    signUpData: null
}

const signUpDataReducer = createSlice({
    name: 'signUpData',
    initialState: initState,
    reducers: {
        signUpData: (state, action)=>{
            state.signUpData = action.payload
        }
    }
});

export default signUpDataReducer.reducer;
export const { signUpData } = signUpDataReducer.actions;