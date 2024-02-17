import { createSlice } from "@reduxjs/toolkit";

const initState = {
    signInData: null
}

const signInReducer = createSlice({
    name: 'signIn',
    initialState: initState,
    reducers: {
        signIn: (state, action)=>{
            state.signInData = action.payload
        }
    }
})

export default signInReducer.reducer;
export const { signIn } = signInReducer.actions;