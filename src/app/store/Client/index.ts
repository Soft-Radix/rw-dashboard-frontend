import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import { ClientType, initialStateProps, filterType, clientIDType, } from "./Interface";

/**
 * API calling
 */

export const addClient = createAsyncThunk(
  "client/add",
  async (payload: ClientType) => {
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

export const getClientList = createAsyncThunk(
  "client/list",
  async (payload: filterType) => {
    const response = await ApiHelperFunction({
      url: "client/list",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const getClientInfo = createAsyncThunk(
  "client/information",
  async (payload: clientIDType) => {
    const response = await ApiHelperFunction({
      url: `client/${payload?.client_id}`,
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
  fetchStatus: 'loading',
  successMsg: "",
  errorMsg: "",
  list: [],
  clientDetail: {}
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

      .addCase(getClientList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getClientList.fulfilled, (state, action) => {
        const { data: { list } } = action.payload?.data
        state.status = 'idle';
        state.list = list
      })
      .addCase(getClientInfo.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.fetchStatus = 'idle';
        state.clientDetail = data
      })
  },
});

export const { restAll } = clientSlice.actions;

export default clientSlice.reducer;
