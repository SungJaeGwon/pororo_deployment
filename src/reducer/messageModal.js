import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isMessageModal: false,
    isMsg: '',
    isOk: false
}

const messageModallReducer = createSlice({
    name: ' messageModal',
    initialState: initState,
    reducers: {
        messageModal: (state, action)=>{
            state.isMessageModal = action.payload.isMessageModal;
            state.isMsg = action.payload.isMsg;
            state.isOk = action.payload.isOk;
        }
    }
});

export default messageModallReducer.reducer;
export const {messageModal} = messageModallReducer.actions;