import { createSlice } from "@reduxjs/toolkit";
import { MachineType } from "../../types/MachineType";

var solutionsJSON = require('./solutions.json');

const initialState = {
    solutions: solutionsJSON,
}

const solutionsSlice = createSlice({
    name: "solutions",
    initialState,
    reducers: {},
    extraReducers: {},
});

const { reducer, actions } = solutionsSlice;

// Actions
export const getSolutions = (state) => state.solutions.solutions;

export const { 
    
 } = actions

export default reducer;