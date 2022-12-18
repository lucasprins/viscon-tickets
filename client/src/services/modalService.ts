import React from "react";
import { ObjectValues } from "../utils/types";


export type ModalContextAction = | {
  type: "TOGGLE_BACKDROP";
  payload?: string;
}
| {
  type: "TOGGLE_LANGUAGE";
};

export type ModalState = {
  backdropIndex: string;
  backdrop: boolean;
  language: boolean;
};

export type ModalContext = {
  modalState: ModalState;
  modalDispatch: React.Dispatch<ModalContextAction>;
};

export const initialModalState: ModalState = {
  backdropIndex: "z-50",
  backdrop: false,
  language: false,
};

export const modalReducer = (state: ModalState, action: ModalContextAction) => {
  switch (action.type) {
    case "TOGGLE_BACKDROP":
      return {
        ...state,
        backdrop: !state.backdrop,
        backdropIndex: action.payload || "z-50",
      };
    case "TOGGLE_LANGUAGE":
      return {
        ...state,
        language: !state.language,
      };
    default:
      return state;
  }
};

export const ModalContext = React.createContext<ModalContext | undefined>(undefined);
