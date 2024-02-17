import { createSlice } from "@reduxjs/toolkit";

const initState= {
    isOkModal: false,
    isOkMsg:'',
}

const signUpModalReducer = createSlice({
    name: 'signUpModal',
    initialState: initState,
    reducers: {
        signUpModal: (state, action)=>{
            state.isOkModal = action.payload.isOkModal;
            state.isOkMsg = action.payload.isOkMsg;
        }
    }
});

export default signUpModalReducer.reducer;
export const { signUpModal} = signUpModalReducer.actions;