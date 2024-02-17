import { createSlice } from "@reduxjs/toolkit";

const initState = {
    signOutModal: false
}

const signOutModalReducer = createSlice({
    name: 'signOutModal',
    initialState: initState,
    reducers: {
        signOutModal: (state, action)=>{
            state.signOutModal = action.payload
        }
    }
});

export default signOutModalReducer.reducer;
export const { signOutModal } = signOutModalReducer.actions;