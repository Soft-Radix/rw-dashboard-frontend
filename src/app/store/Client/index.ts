import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import { AddClientType, initialStateProps, } from "./Interface";

/**
 * API calling
 */

export const addClient = createAsyncThunk(
  "client/add",
  async (payload: AddClientType) => {
    const response = await ApiHelperFunction({
      url: "client/add",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

/**
 * The initial state of the auth slice.
 */
export const initialState: initialStateProps = {
  status: "idle",
  successMsg: "",
  errorMsg: ""
};

/**
 * The auth slice.
 */
export const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  reducers: {
    restAll: (state) => {
      state.successMsg = '';
      state.errorMsg = ''
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addClient.pending, (state) => {
        state.status = 'loading'
      })

      .addCase(addClient.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        state.status = 'idle'
        console.log(action.payload, 'payload?.data?.status44');

        if (payload?.data?.status) {
          state.successMsg = payload?.data?.message
          toast.success(payload?.data?.message)
        } else {
          state.errorMsg = payload?.data?.message
          toast.error(payload?.data?.message)
        }
      })

      .addCase(addClient.rejected, (state, { error }) => {
        toast.error(error?.message)
      })
  },
});

export const { restAll } = clientSlice.actions;

export default clientSlice.reducer;
