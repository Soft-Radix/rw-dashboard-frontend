import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import ApiHelperFunction from 'src/api';

/**
 * API calling
 */
export const logIn = createAsyncThunk("todos/1", async () => {
    const response = await ApiHelperFunction({
        url: "todos/1", // end point
        method: "get", // method
        data: {}, // payload data
        params: '' // query params
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
