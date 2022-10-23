import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import AuthService from "./authService";
import { setMessage } from "./messageSlice";

const existingUser = localStorage.getItem("user");
const user = existingUser ? JSON.parse(existingUser) : null;

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            if(response.data.data == null) {
                thunkAPI.dispatch(setMessage("Invalid email or password."));
                return thunkAPI.rejectWithValue(response.data.message);
            }
            return { user: response.data.data };
        } catch (error: any) {
            console.log(error);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

type userType = {
    id: string;
    firstName: string;
    prefix: string | null;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    companyId: string;
    accessToken: string;
};

type payload = {
    user: userType | null;
};

type initialStateType = {
    user: userType | null;
    isLoggedIn: boolean;
};

const initialState: initialStateType = user != null ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled.toString()]: (state, action: PayloadAction<payload>) => {
            state.isLoggedIn = action.payload.user == null ? false : true;
            state.user = action.payload.user;
        },
        [login.rejected.toString()]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled.toString()]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});


export const getUser = (state: RootState) => state.auth.user
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

const { reducer } = authSlice;
export default reducer;
