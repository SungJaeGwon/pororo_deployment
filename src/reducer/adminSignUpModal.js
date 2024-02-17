import { createSlice } from "@reduxjs/toolkit";

const initState= {
    isAdminOkModal: false,
    isOkMsg:'',
}

const signUpModalReducer = createSlice({
    name: 'adminSignUpModal',
    initialState: initState,
    reducers: {
        adminSignUpModal: (state, action)=>{
            state.isAdminOkModal = action.payload.isAdminOkModal;
            state.isOkMsg = action.payload.isOkMsg;
        }
    }
});

export default signUpModalReducer.reducer;
export const { adminSignUpModal} = signUpModalReducer.actions;