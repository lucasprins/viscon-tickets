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

export enum AppAction {
  CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
  USER_LOGIN = "USER_LOGIN",
	USER_LOGOUT = "USER_LOGOUT"
}

interface TAppState {
  language: string;
	isAuthenticated: boolean;
  user: UserType | undefined;

}

interface TAppAction {
  type: AppAction;
  payload?: any;
}

interface TAppContext {
  appState: TAppState;
  appDispatch: React.Dispatch<TAppAction>;
}

const initialAppState: TAppState = {
  language: "en",
	isAuthenticated: initialUser !== undefined,
  user: initialUser,
};

const appReducer = (state: TAppState, action: TAppAction) => {
  switch (action.type) {
    case AppAction.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case AppAction.USER_LOGIN:
      return {
        ...state,
				isAuthenticated: true,
        user: action.payload,
      };
		case AppAction.USER_LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: undefined
			}
  }
};

export const AppContext = React.createContext<TAppContext | undefined>(undefined);

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
