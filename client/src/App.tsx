import React, { useContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Backdrop from "./components/atoms/Backdrop/Backdrop";
import { ModalChangeLanguage } from "./components/organisms/Modal/ModalChangeLanguage";
import { getBackdropState } from "./features/modal/modalSlice";
import { useAppSelector } from "./utils/hooks";
import { routes } from "./routes";
import { userType as UserType } from "./utils/types";

const localStorageUser = localStorage.getItem("user");
const initialUser = localStorageUser ? JSON.parse(localStorageUser) : undefined;

type AppContextEvent =
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

interface AppState {
  language: string;
  isAuthenticated: boolean;
  user: UserType | undefined;
}

interface AppContext {
  appState: AppState;
  appDispatch: React.Dispatch<AppContextEvent>;
}

const initialAppState: AppState = {
  language: "en",
  isAuthenticated: initialUser !== undefined,
  user: initialUser,
};

const appReducer = (state: AppState, action: AppContextEvent) => {
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

  const backdropState = useAppSelector(getBackdropState);

  return (
    <>
      <AppContext.Provider value={{ appState: appState, appDispatch: appDispatch }}>
        <ModalChangeLanguage />
        <Backdrop state={backdropState} z_index='z-40' />
        <Router>
          <Routes>
            {routes.map(({ path, component }, key) => (
              <Route path={path} key={key} element={component} />
            ))}
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
