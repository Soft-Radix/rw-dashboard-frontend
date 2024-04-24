import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import {
  AgentType,
  agentIDType,
  filterType,
  initialStateProps,
} from "./Interafce";

/**
 * API calling
 */

export const addAgent = createAsyncThunk(
  "agent/add",
  async (payload: AgentType) => {
    const response = await ApiHelperFunction({
      url: "agent/add",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const getAgentList = createAsyncThunk(
  "agent/list",
  async (payload: filterType) => {
    const response = await ApiHelperFunction({
      url: "agent/list",
      method: "post",
      data: payload,
    });
    // console.log(response.data, "response.data");

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const getAgentInfo = createAsyncThunk(
  "agent/information",
  async (payload: agentIDType) => {
    const response = await ApiHelperFunction({
      url: `admin/agent-detail/${payload?.agent_id}`,
      method: "post",
      data: payload,
    });
    console.log(response.data, "response.Id");
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
  successMsg: "",
  errorMsg: "",
  list: [],
  agentDetail: {},
  selectedColumn: [],
};

/**
 * The auth slice.
 */
export const agentSlice = createSlice({
  name: "agentSlice",
  initialState,
  reducers: {
    restAll: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAgent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        state.status = "idle";
        if (payload?.data?.status) {
          state.successMsg = payload?.data?.message;
          toast.success(payload?.data?.message);
        } else {
          state.errorMsg = payload?.data?.message;
          toast.error(payload?.data?.message);
        }
      })
      .addCase(addAgent.rejected, (state, { error }) => {
        toast.error(error?.message);
      })
      .addCase(getAgentList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAgentList.fulfilled, (state, action) => {
        const response = action.payload?.data;

        console.log(response, "5465544554");

        state.status = "idle";
        if (!response.status) {
          toast.error(response?.message);
        }
        state.list = response?.data?.list || [];
      })
      .addCase(getAgentList.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getAgentInfo.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.fetchStatus = "idle";
        state.agentDetail = data;
      });
  },
});

export const { restAll } = agentSlice.actions;

export default agentSlice.reducer;
