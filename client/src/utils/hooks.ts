import { useContext, useEffect, useMemo, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { ModalContext } from "../services/modalService";
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

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("modalContext must be used within ModalContext.Provider");
  }

  return context;
}

export const useAuthentication = (): boolean => {
  const { appState } = useAppContext();
  let accessExpired = useJwtExpiration();

  if (accessExpired) {
    return false;
  }

  return appState.isAuthenticated;
};

export const useJwtExpiration = (): boolean => {
  const { appState } = useAppContext();
  let isExpired = false;

  if (appState.user?.accessToken) {
    const { exp } = parseJwt(appState.user.accessToken);
    const currentTime = new Date().getTime() / 1000;
    if (exp < currentTime) {
      isExpired = true;
    }
  }

  return isExpired;
};

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * Custom hook to check if the window is mobile/tablet size
 * @returns boolean
 * 
 * @example
 * const isMobile = useWindowMobile();
 * 
 * if (isMobile) {
 *  // do something
 * }
 */
export const useWindowMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 1280) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  window.addEventListener('resize', handleResize);

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};