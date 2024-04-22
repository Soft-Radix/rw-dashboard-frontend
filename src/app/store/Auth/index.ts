import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import ApiHelperFunction from 'src/api';

// Define a type for the payload
interface LoginPayload {
    email: string;
    password: string;
}

/**
 * API calling
 */
export const logIn = createAsyncThunk("auth/login", async (payload: LoginPayload) => {
    const response = await ApiHelperFunction({
        url: "auth/login", // end point
        method: "post", // method
        data: payload, // payload data
    });
    let resData = response?.data;
    return resData;
});

/**
 * The type definition for the initial state of the auth slice.
 */
type initialStateProps = {
    status: string;
};

/**
 * The initial state of the auth slice.
 */
const initialState: initialStateProps = {
    status: 'idle',
};

/**
 * The auth slice.
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(logIn.pending, (state) => {
                console.log('pending78')
            })
            .addCase(logIn.fulfilled, (state) => {
                console.log('fulfilled78')
            })
            .addCase(logIn.rejected, (state) => {
                console.log('rejected78')
            });
    }
})


export const { } = authSlice.actions;

export default authSlice.reducer;
