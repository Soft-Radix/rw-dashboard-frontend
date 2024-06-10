import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import {
  AgentType,
  agentIDType,
  deleteDocument,
  filterAgentType,
  initialStateProps,
  uploadData,
} from "./Interafce";
import { calculatePageNumber } from "src/utils";
import AgentDetails from "src/app/components/agents/AgentDetails";

/**
 * API calling
 */

export const addAgent = createAsyncThunk(
  "agent/add",
  async (payload: AgentType) => {
    const response = await ApiHelperFunction({
      url: "agent/add",
      method: "post",
      data: payload.formData,
      formData: true,
    });
    // console.log(response, "checkk");

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const getAgentList = createAsyncThunk(
  "agent/list",
  async (payload: filterAgentType) => {
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
export const updateAgentProfile = createAsyncThunk(
  "agent/edit/{agent_id}",
  async (payload: uploadData, { dispatch }) => {
    const response = await ApiHelperFunction({
      url: `/agent/edit`,
      method: "put",
      data: payload,
      formData: true,
    });

    return {
      data: response.data,
    };
  }
);

export const uploadAttachment = createAsyncThunk(
  "agent/upload-attachments",
  async (payload: uploadData) => {
    const response = await ApiHelperFunction({
      url: `/agent/upload-attachments`,
      method: "post",
      data: payload,
      formData: true,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const deleteAttachment = createAsyncThunk(
  "agent/delete-attachment",
  async (payload: deleteDocument) => {
    const response = await ApiHelperFunction({
      url: "agent/delete-attachment",
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
  resetFormData: {},
  actionStatusAttachment: false,
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
    resetFormData: (state) => {
      state.agentDetail = {};
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
      })
      .addCase(updateAgentProfile.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(updateAgentProfile.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
        } else {
          // console.log(response, "response");
          state.agentDetail = { ...response?.data };
          // console.log(state.agentDetail, "ghfdfdfgh");
          toast.success(response?.message);
        }
      })
      .addCase(updateAgentProfile.rejected, (state, action) => {
        state.actionStatus = false;
      })
      .addCase(uploadAttachment.pending, (state) => {
        state.fetchStatus = "loading";
        state.actionStatus = true;
      })
      .addCase(uploadAttachment.fulfilled, (state, action) => {
        state.fetchStatus = "idle";
        const response = action.payload?.data;

        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
          // console.log(response, "responsed");
        } else {
          let contactArray = state.agentDetail.attachments.concat(
            response.data
          );
          state.agentDetail.attachments = contactArray;

          // state.agentDetail.attachments = state.agentDetail.attachments.concat(
          //   response.data
          // );
          // state.agentDetail = ;
          // console.log(state.agentDetail.attachments, "ghgh");
          toast.success(response?.message);
        }
      })
      .addCase(uploadAttachment.rejected, (state, action) => {
        state.fetchStatus = "idle";
        state.actionStatus = false;
      })
      .addCase(deleteAttachment.pending, (state) => {
        state.actionStatusAttachment = true;
      })
      .addCase(deleteAttachment.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        // console.log(payload, "payload");
        // const { attachment_id } = action.meta?.arg;
        // console.log(accountManger_id, "idd");
        state.actionStatusAttachment = false;
        // if (payload?.data?.status) {
        //   state.list = state.list.filter(
        //     // (item) => item.id !== accountManger_id
        //   );

        toast.success(payload?.data?.message);
        // } else {
        //   toast.error(payload?.data?.message);
        // }
      })
      .addCase(deleteAttachment.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatusAttachment = false;
      });
  },
});

export const { restAll, changeFetchStatus, resetFormData } = agentSlice.actions;

export default agentSlice.reducer;
