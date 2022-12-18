import { useContext } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppContext } from "../App";
import type { RootState, AppDispatch } from "../store";
import { parseJwt } from "./jwt";

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("appContext must be used within AppContext.Provider");
  }

  return context;
};

export const useAuthentication = (): boolean => {
  const { appState } = useAppContext();

  return appState.isAuthenticated;
};