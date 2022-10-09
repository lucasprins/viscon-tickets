import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { MachineType } from "../../types/MachineType";

var machinesJSON = require('./machines.json');

const initialState = {
    machines: machinesJSON,
    selectedMachine: {},
}

const machinesSlice = createSlice({
    name: "machines",
    initialState,
    reducers: {
        setSelectedMachine: (state, action) => {
            state.selectedMachine = action.payload;
        }
    },
    extraReducers: {},
});

const { reducer, actions } = machinesSlice;

// Actions
export const getMachines = (state) => state.machines.machines;
export const getSelectedMachine = (state) => state.machines.selectedMachine;

export const {
    setSelectedMachine
} = actions

export default reducer;