import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isAddressSearch: false
}

const addressSearchReducer = createSlice({
    name: 'addressSearch',
    initialState: initState,
    reducers: {
        addressSearch: (state, action)=>{
            state.isAddressSearch = action.payload
        }
    }
});

export default addressSearchReducer.reducer;
export const { addressSearch } = addressSearchReducer.actions;