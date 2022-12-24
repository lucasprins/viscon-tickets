import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Backdrop from "./components/atoms/Backdrop/Backdrop";
import { ModalChangeLanguage } from "./components/organisms/Modal/ModalChangeLanguage";
import { routes } from "./routes";
import { userType as UserType } from "./utils/types";
import { parseJwt } from "./utils/jwt";
import { initialModalState, ModalContext, modalReducer } from "./services/modalService";

const localStorageUser = localStorage.getItem("user");
const initialUser = localStorageUser ? JSON.parse(localStorageUser) : undefined;

type AppContextAction =
  | {
      type: "CHANGE_LANGUAGE";
      payload: string;
    }
  | {
      type: "USER_LOGIN";
      payload: UserType;
    }
  | {
      type: "USER_LOGOUT";
    };

type AppState = {
  language: string;
  isAuthenticated: boolean;
  user: UserType | undefined;
};

type AppContext = {
  appState: AppState;
  appDispatch: React.Dispatch<AppContextAction>;
};

const initialAppState: AppState = {
  language: "en",
  isAuthenticated: initialUser !== undefined,
  user: initialUser,
};

const appReducer = (state: AppState, action: AppContextAction) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "USER_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
  }
};

export const AppContext = React.createContext<AppContext | undefined>(undefined);

function App() {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);
  const [modalState, modalDispatch] = useReducer(modalReducer, initialModalState);

  useEffect(() => {
    if (appState.user?.accessToken) {
      const { exp } = parseJwt(appState.user.accessToken);
      const currentTime = new Date().getTime() / 1000;
      if (exp < currentTime) {
        appDispatch({ type: "USER_LOGOUT" });
      }
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ appState: appState, appDispatch: appDispatch }}>
        <ModalContext.Provider value={{ modalState: modalState, modalDispatch: modalDispatch }}>
          <ModalChangeLanguage />
          <Backdrop />
          <Router>
            <Routes>
              {routes.map(({ path, component }, key) => (
                <Route path={path} key={key} element={component} />
              ))}
            </Routes>
          </Router>
        </ModalContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;

// translations fixing:
//TicketCancelmodal
//
