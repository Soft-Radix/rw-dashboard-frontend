import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import {
  AgentGroupType,
  initialStateProps,
  filterType,
  deleteAgentGroupType,
  UpdateAgentGroupPayload,
  AgentGroupIDType,
  searchAgentGroupType,
} from "./Interface";
import { calculatePageNumber } from "src/utils";

/**
 * API calling
 */

export const addAgentGroup = createAsyncThunk(
  "agent-group/add",
  async (payload: AgentGroupType) => {
    const response = await ApiHelperFunction({
      url: "agent-group/add",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
addAgentGroup;

export const getAgentGroupList = createAsyncThunk(
  "agent-group/list",
  async (payload: filterType) => {
    const response = await ApiHelperFunction({
      url: "agent-group/list",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
    addAgentGroup;
  }
);

export const deleteAgentGroup = createAsyncThunk(
  "agent-group/delete",
  async (payload: deleteAgentGroupType) => {
    const response = await ApiHelperFunction({
      url: "agent-group/delete",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
addAgentGroup;
export const getAgentGroupInfo = createAsyncThunk(
  "agent-group/{group_id}",
  async (payload: AgentGroupIDType) => {
    const response = await ApiHelperFunction({
      url: `agent-group/${payload?.group_id}`,
      method: "get",
      data: payload,
    });
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const updateGroupName = createAsyncThunk(
  "agent-group/edit",
  async (payload: UpdateAgentGroupPayload) => {
    const response = await ApiHelperFunction({
      url: `agent-group/edit`,
      method: "put",
      data: payload,
    });
    // console.log(response, "check");
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const addAgentInagentGroup = createAsyncThunk(
  "agent/list",
  async (payload: filterType) => {
    const response = await ApiHelperFunction({
      url: `agent/list`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const deleteAgentMemberGroup = createAsyncThunk(
  "agent-group-member/delete",
  async (payload: deleteAgentGroupType) => {
    const response = await ApiHelperFunction({
      url: "agent-group-member/delete",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const searchAgentGroup = createAsyncThunk(
  "agent-group/addMember",
  async (payload: searchAgentGroupType) => {
    const response = await ApiHelperFunction({
      url: `agent-group/addMember`,
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
  actionStatus: false,
  successMsg: "",
  errorMsg: "",
  list: [],
  searchAgentList: [],
  agentGroupDetail: {},
  selectedColumn: [],
  total_records: 0,
  addagentList: [],
  actionStatusDisabled: false,
  actionStatusEdit: false,
  actionStatusGroupMember: false,
};

/**
 * The auth slice.
 */
export const agentGroupSlice = createSlice({
  name: "agentGroupSlice",
  initialState,
  reducers: {
    restAll: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
      state.selectedColumn = [];
    },
    changeFetchStatus: (state) => {
      state.fetchStatus = "loading";
    },
    sortColumn: (state, { payload }) => {
      state.list = payload || [];
    },
    updateSelectedColumn: (state, { payload }) => {
      const predefinedItems = {
        Id: 0,
        Name: 1,
        "Company Name": 2,
        Date: 3,
        Status: 4,
        "": -1, // Place "Actions" at the end
      };

      let isExist = state.selectedColumn.indexOf(payload);
      if (isExist !== -1) {
        state.selectedColumn = state.selectedColumn.filter(
          (item) => item !== payload
        );
      } else {
        state.selectedColumn.push(payload);
      }

      // Sort selectedColumn based on predefined positions
      state.selectedColumn.sort((a, b) => {
        const indexA =
          predefinedItems[a] !== undefined
            ? predefinedItems[a]
            : state.selectedColumn.length;
        const indexB =
          predefinedItems[b] !== undefined
            ? predefinedItems[b]
            : state.selectedColumn.length;
        return indexA - indexB;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAgentGroup.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(addAgentGroup.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        state.actionStatus = false;
        if (payload?.data?.status) {
          state.successMsg = payload?.data?.message;
          0;
          toast.success(payload?.data?.message);
        } else {
          state.errorMsg = payload?.data?.message;
          toast.error(payload?.data?.message);
        }
      })
      .addCase(addAgentGroup.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })
      .addCase(deleteAgentGroup.pending, (state) => {
        state.actionStatusDisabled = true;
      })
      .addCase(deleteAgentGroup.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        const { group_id } = action.meta?.arg;
        // console.log(group_id, "idd");
        if (payload?.data?.status) {
          // state.list = state.list.filter((item) => item.id !== group_id);

          toast.success(payload?.data?.message);
          state.actionStatusDisabled = false;
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(deleteAgentGroup.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatusDisabled = false;
      })

      .addCase(getAgentGroupList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAgentGroupList.fulfilled, (state, action) => {
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
      .addCase(getAgentGroupList.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getAgentGroupInfo.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(getAgentGroupInfo.fulfilled, (state, action) => {
        // console.log(action.payload?.data, "find");
        const { data } = action.payload?.data;
        // const { message } = action.payload?.data;
        // console.log(message, "checkrrr");
        state.fetchStatus = "idle";
        state.agentGroupDetail = data;
      })
      .addCase(getAgentGroupInfo.rejected, (state) => {
        state.fetchStatus = "idle";
      })

      .addCase(updateGroupName.pending, (state) => {
        state.actionStatusEdit = true;
      })
      .addCase(updateGroupName.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.actionStatusEdit = false;
        if (!response.status) {
          toast.error(response?.message);
        } else {
          state.agentGroupDetail = { ...response?.data };

          toast.success(response?.message);
        }
      })
      .addCase(updateGroupName.rejected, (state, action) => {
        state.actionStatusEdit = false;
      })

      .addCase(searchAgentGroup.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(searchAgentGroup.fulfilled, (state, action) => {
        const response = action.payload?.data;

        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
          // console.log(response, "responsed");
        } else {
          let contactArray = state.agentGroupDetail.group_members.concat(
            response.data
          );
          // console.log("🚀 ~ .addCasegroup_members", state.agentGroupDetail.group_members)
          // console.log(contactArray, "contactArray");
          state.agentGroupDetail.group_members = contactArray;

          // state.agentDetail.attachments = state.agentDetail.attachments.concat(
          //   response.data
          // );
          // state.agentDetail = ;
          // console.log(state.agentGroupDetail.group_members, "ghgh");
          toast.success(response?.message);
        }
      })
      .addCase(searchAgentGroup.rejected, (state, action) => {
        state.actionStatus = false;
      })

      .addCase(addAgentInagentGroup.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(addAgentInagentGroup.fulfilled, (state, action) => {
        const response = action.payload?.data;
        // console.log(response, "findttt");
        const { data } = action.payload?.data;
        // console.log(data, "dgftdfdf");
        state.searchAgentList = data.list;
        // console.log(state.searchAgentList, "serch");
        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
          state.total_records = calculatePageNumber(
            response?.data?.total_records,
            10
          );
        }
      })
      .addCase(addAgentInagentGroup.rejected, (state, action) => {
        state.actionStatus = false;
      })
      .addCase(deleteAgentMemberGroup.pending, (state) => {
        state.actionStatusGroupMember = true;
      })
      .addCase(deleteAgentMemberGroup.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        const { member_id } = action.meta?.arg;
        // console.log(group_id, "idd");
        if (payload?.data?.status) {
          state.agentGroupDetail.group_members =
            state.agentGroupDetail.group_members.filter(
              (item) => item.id !== member_id
            );

          state.actionStatusGroupMember = false;
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(deleteAgentMemberGroup.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatusGroupMember = false;
      });
  },
});

export const { restAll, changeFetchStatus, updateSelectedColumn, sortColumn } =
  agentGroupSlice.actions;

export default agentGroupSlice.reducer;
