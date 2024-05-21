import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiHelperFunction from "src/api";
import {
  SubscriptionList,
  initialStateProps,
  ProjectAdd,
  ProductDelete,
  ProductUpdate,
} from "./Interface";

/**
 * API calling
 */

// ----*-------product-list-----

export const projectAdd = createAsyncThunk(
  "project/add",
  async (payload: ProjectAdd) => {
    const response = await ApiHelperFunction({
      url: `/project/add`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const productUpdate = createAsyncThunk(
  "product/update",
  async (payload: ProductUpdate) => {
    const response = await ApiHelperFunction({
      url: `/product/update`,
      method: "put",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const projectList = createAsyncThunk(
  "project/list",
  async (payload: SubscriptionList) => {
    const response = await ApiHelperFunction({
      url: `/project/list`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const productDelete = createAsyncThunk(
  "product/delete",
  async (payload: ProductDelete) => {
    const response = await ApiHelperFunction({
      url: `/product/delete`,
      method: "delete",
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
  fetchStatus: "loading",
  actionStatus: false,
  successMsg: "",
  errorMsg: "",
  list: [],
  clientDetail: {},
  selectedColumn: [],
  total_records: 0,
};

/**
 * The auth slice.
 */
export const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    restAll: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
      state.selectedColumn = [];
    },
  },
});

export const { restAll } = projectSlice.actions;

export default projectSlice.reducer;
