import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modalReducer from './features/modal/modalSlice';
import machinesReducer from './features/machines/machinesSlice';
import solutionsReducer from './features/solutions/solutionsSlice';
import ticketsReducer from "./features/tickets/ticketsSlice";

const reducers = {
	modal: modalReducer,
	machines: machinesReducer,
	solutions: solutionsReducer,
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
