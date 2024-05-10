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
import { calculatePageNumber } from "src/utils";

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
      url: `/agent/detail/${payload?.agent_id}`,
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
  fetchStatus: "loading",
  successMsg: "",
  errorMsg: "",
  list: [],
  agentDetail: {},
  selectedColumn: [],
  actionStatus: false,
  total_records: 0,
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
    changeFetchStatus: (state) => {
      state.fetchStatus = "loading";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAgent.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        state.actionStatus = false;
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
        state.actionStatus = false;
      })
      .addCase(getAgentList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAgentList.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.status = "idle";
        if (!response.status) {
          toast.error(response?.message);
        } else {
          state.list = response?.data?.list || [];
          state.total_records = calculatePageNumber(
            response?.data?.total_records,
            10
          );
        }
      })
      .addCase(getAgentList.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getAgentInfo.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(getAgentInfo.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.fetchStatus = "idle";
        state.agentDetail = data;
      })
      .addCase(getAgentInfo.rejected, (state) => {
        state.fetchStatus = "idle";
      });
  },
});

export const { restAll, changeFetchStatus } = agentSlice.actions;

export default agentSlice.reducer;
