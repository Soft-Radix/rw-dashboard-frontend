import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiHelperFunction from "src/api";
import {
  SubscriptionList,
  initialStateProps,
  ProjectAdd,
  ProductDelete,
  ProductUpdate,
  ProjectUpdate,
} from "./Interface";
import { deleteAccManagerType } from "../AccountManager/Interface";

/**
 * API calling
 */

// ----*-------project-apis-----

export const projectAdd = createAsyncThunk(
  "project/add",
  async (payload: ProjectAdd) => {
    const response = await ApiHelperFunction({
      url: `/project/add`,
      method: "post",
      data: payload,
    });

    return {
      data: response.data,
    };
  }
);

export const projectUpdate = createAsyncThunk(
  "project/update",
  async (payload: ProjectUpdate) => {
    const response = await ApiHelperFunction({
      url: `project/update/${payload.project_id}`,
      method: "put",
      data: payload.data,
    });

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

    return {
      data: response.data,
    };
  }
);

export const deleteProject: any = createAsyncThunk(
  "project/delete",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: "/project/delete",
      method: "delete",
      data: payload,
    });

    return {
      data: response.data,
    };
  }
);
// -----------column-apis-----

//Add column api
export const projectColumnAdd = createAsyncThunk(
  "project/column/add",
  async (payload: ProjectAdd) => {
    const response = await ApiHelperFunction({
      url: `/project/column/add`,
      method: "post",
      data: payload,
    });

    return {
      data: response.data,
    };
  }
);

export const projectColumnList = createAsyncThunk(
  "project/columns/list",
  async (payload: ProjectAdd) => {
    const response = await ApiHelperFunction({
      url: `/project/columns/list`,
      method: "post",
      data: payload,
    });

    return {
      data: response.data,
    };
  }
);

export const deleteColumn: any = createAsyncThunk(
  "column/delete",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `/column/delete/${payload}`,
      method: "delete",
      data: payload,
    });

    return {
      data: response.data,
    };
  }
);
export const projectColumnUpdate: any = createAsyncThunk(
  "column/update",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `column/update/${payload.column_id}`,
      method: "put",
      data: payload.data,
    });

    return {
      data: response.data,
    };
  }
);

export const projectColumnMove: any = createAsyncThunk(
  "project/column-move",
  async (payload: any) => {
    console.log("🚀 ~ payload:", payload);
    const response = await ApiHelperFunction({
      url: `project/column-move`,
      method: "post",
      data: payload,
    });

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
