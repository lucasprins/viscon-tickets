import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import modalReducer from './features/modal/modalSlice';
import machinesReducer from './features/machines/machinesSlice';
import solutionsReducer from './features/solutions/solutionsSlice';
import messageReducer from "./features/auth/messageSlice";
import ticketsReducer from "./features/tickets/ticketsSlice";

const reducers = {
	user: userReducer,
	modal: modalReducer,
	machines: machinesReducer,
	solutions: solutionsReducer,
	message: messageReducer,
	tickets: ticketsReducer
  };

export const store = configureStore({
	reducer: reducers,
	devTools: true
});

/** Redux Types */
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
