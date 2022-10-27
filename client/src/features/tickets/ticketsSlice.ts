import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type initialState = {
    tickets: any[];
}

const initialState: initialState = {
    tickets: []
}

const authSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {},
    extraReducers: {},
});

const { reducer } = authSlice;
export default reducer;
