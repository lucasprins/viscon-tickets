import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backdrop: false,
    languageModal: false,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleBackdrop: (state) => {
            state.backdrop = state.backdrop ? false : true;
        },
        toggleLanguageModal: (state) => {
            state.languageModal = state.languageModal ? false : true;
        },
    }
});

const { reducer, actions } = modalSlice;

// Actions
export const getBackdropState = (state) => state.modal.backdrop;
export const getLanguageModal = (state) => state.modal.languageModal;

export const { 
    toggleBackdrop,
    toggleLanguageModal,
    toggleKnowledgebaseModal
} = actions

export default reducer;