import { createSlice } from "@reduxjs/toolkit";

const initState = {
    adminsignInData: null
}

const adminsignInReducer = createSlice({
    name: 'adminsignIn',
    initialState: initState,
    reducers: {
        adminsignIn: (state, action)=>{
            state.adminsignInData = action.payload
        }
    }
})

export default adminsignInReducer.reducer;
export const { adminsignIn } = adminsignInReducer.actions;