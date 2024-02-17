import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isAddress:'',
    isRemainingAddress:''
}
const addressReducer = createSlice({
    name:'address',
    initialState: initState,
    reducers: {
        address: (state, action)=>{
            state.isAddress = action.payload.isAddress;
            state.isRemainingAddress = action.payload.isRemainingAddress;
        }
    }
});
export default addressReducer.reducer;
export const {address} = addressReducer.actions;