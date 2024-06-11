import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiHelperFunction from "src/api";
import {
  SubscriptionList,
  initialStateProps,
  ProjectAdd,
  ProductDelete,
  ProductUpdate,
  ProjectUpdate,
  ProjectAddDoc,
  Taskadd,
  ApiResponse,
} from "./Interface";
import { deleteAccManagerType } from "../AccountManager/Interface";
import { clientIDType } from "../Client/Interface";
import toast from "react-hot-toast";
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
export const projectAddDoc = createAsyncThunk(
  "project/add",
  async (payload: ProjectAddDoc) => {
    const response = await ApiHelperFunction({
      url: `/project/add`,
      method: "post",
      data: { name: payload.name },
      headers: { Authorization: `Bearer ${payload.token}` },
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
export const TaskAdd = createAsyncThunk(
  "project/task/add",
  async (payload: Taskadd | FormData) => {
    const response = await ApiHelperFunction({
      url: `/project/task/add`,
      method: "post",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      data: response.data,
    };
  }
);
export const EditTaskAdd = createAsyncThunk(
  "project/task/edit",
  async (payload: Taskadd | FormData) => {
    const response = await ApiHelperFunction({
      url: `project/task/edit`,
      method: "post",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
export const TaskDetails: any = createAsyncThunk(
  "project/task-detail/",
  async (payload: any) => {
    // console.log("🚀 ~ payload:", payload);

    const response = await ApiHelperFunction({
      url: `project/task-detail/${payload}`,
      method: "get",
      data: payload,
    });
    return {
      data: response.data,
    };
  }
);

export const TaskDeleteAttachment: any = createAsyncThunk(
  "/project/task/delete-files",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `project/task/delete-files`,
      method: "post",
      data: payload,
    });
    return {
      data: response.data,
    };
  }
);
export const deleteTask: any = createAsyncThunk(
  "project/task-delete/",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `/project/task-delete/${payload}`,
      method: "delete",
      data: payload,
    });
    return {
      data: response.data,
    };
  }
);
export const TaskListColumn: any = createAsyncThunk(
  "TaskListColumn",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `/project/task/list`,
      method: "post",
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

export const projectTaskMove: any = createAsyncThunk(
  "project/task/sort",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `project/task/sort`,
      method: "post",
      data: payload,
    });

    return {
      data: response.data,
    };
  }
);

export const projectTaskMoveCol: any = createAsyncThunk(
  "project/task/move-in-column",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `project/task/move-in-column`,
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
  assignedAgentDetail: [],
  agentTotal_records: 0,
  taskDetailInfo: {},
  projectInfo: {},
  actionDisable: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(TaskDetails.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(TaskDetails.fulfilled, (state, action) => {
        console.log(state, "statet");
        const { data } = action.payload?.data;
        state.fetchStatus = "idle";
        state.taskDetailInfo = data;
      })
      .addCase(TaskDetails.rejected, (state) => {
        state.fetchStatus = "idle";
      })
      .addCase(projectColumnList.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(projectColumnList.fulfilled, (state, action) => {
        console.log(state, "statet");
        const { data } = action.payload?.data;
        state.fetchStatus = "idle";
        state.projectInfo = data;
      })
      .addCase(projectColumnList.rejected, (state) => {
        state.fetchStatus = "idle";
      })
      .addCase(TaskDeleteAttachment.pending, (state) => {
        state.actionDisable = true;
      })
      .addCase(TaskDeleteAttachment.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        // const { member_id } = action.meta?.arg;
        // console.log(group_id, "idd");
        if (payload?.data?.status) {
          // state.agentGroupDetail.group_members =
          //   state.agentGroupDetail.group_members.filter(
          //     (item) => item.id !== member_id
          //   );

          state.actionDisable = false;
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(TaskDeleteAttachment.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionDisable = false;
      });
  },
});
export const { restAll } = projectSlice.actions;
export default projectSlice.reducer;
