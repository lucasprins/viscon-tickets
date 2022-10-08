import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import modalReducer from './features/modal/modalSlice';

const reducers = {
	user: userReducer,
	modal: modalReducer
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
