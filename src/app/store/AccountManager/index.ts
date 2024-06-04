import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";

import { calculatePageNumber } from "src/utils";
import {
  AccManagerType,
  accManagerIDType,
  assignedClientInfoType,
  deleteAccManagerType,
  filterType,
  initialStateProps,
} from "./Interface";

/**
 * API calling
 */

export const addAccManager = createAsyncThunk(
  "accountManager/add",
  async (payload: AccManagerType) => {
    const response = await ApiHelperFunction({
      url: "accountManager/add",
      method: "post",
      data: payload.formData,
      formData: true,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const getAccManagerList = createAsyncThunk(
  "accountManager/list",
  async (payload: filterType) => {
    const response = await ApiHelperFunction({
      url: "accountManager/list",
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
export const getAccManagerInfo = createAsyncThunk(
  "accountManager/detail/{accountManager_id}",
  async (payload: accManagerIDType) => {
    // console.log(payload, "payload");
    const response = await ApiHelperFunction({
      url: `accountManager/detail/${payload?.account_manager_id}`,
      method: "get",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const deleteAccManager = createAsyncThunk(
  "accountManager/delete",
  async (payload: deleteAccManagerType) => {
    const response = await ApiHelperFunction({
      url: "accountManager/delete",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const assignedAccManagerList = createAsyncThunk(
  "accountManager/AssignClients",
  async (payload: assignedClientInfoType) => {
    // console.log(payload, "payload");
    const response = await ApiHelperFunction({
      url: "accountManager/AssignClients",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const accManagerClientList = createAsyncThunk(
  "accountManager/client-list",
  async (payload: deleteAccManagerType) => {
    console.log(payload, "payload");
    const typeParameter =
      payload.type !== undefined ? `type=${payload.type}` : "type=0";
    const response = await ApiHelperFunction({
      url: `accountManager/client-list?account_Manager_id=${payload.accountManger_id}&${typeParameter}`,
      method: "get",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const updateAccManagerList = createAsyncThunk(
  "accountManager/update",
  async (payload: assignedClientInfoType) => {
    console.log(payload, "payload");
    const response = await ApiHelperFunction({
      url: "/accountManager/update",
      method: "put",
      data: payload.formData,
      formData: true,
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
  accManagerDetail: {},
  selectedColumn: [],
  actionStatus: false,
  total_records: 0,
};

/**
 * The auth slice.
 */
export const accManagerSlice = createSlice({
  name: "accManagerSlice",
  initialState,
  reducers: {
    restAll: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
    },
    changeFetchStatus: (state) => {
      state.fetchStatus = "loading";
    },
    resetFormManagrData: (state) => {
      state.accManagerDetail = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAccManager.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(addAccManager.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        state.actionStatus = false;
        if (payload?.data?.status) {
          // console.log("🚀check", payload?.data?.status);

          state.successMsg = payload?.data?.message;
          toast.success(payload?.data?.message);
        } else {
          state.errorMsg = payload?.data?.message;
          toast.error(payload?.data?.message);
        }
      })
      .addCase(addAccManager.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })
      .addCase(getAccManagerList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAccManagerList.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.status = "idle";
        if (!response.status) {
          toast.error(response?.message);
        } else {
          state.list = response?.data?.list || [];
          // console.log(state.list, "listtt");
          state.total_records = calculatePageNumber(
            response?.data?.total_records,
            10
          );
        }
      })
      .addCase(getAccManagerList.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getAccManagerInfo.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(getAccManagerInfo.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        // console.log(data, "datata");
        state.fetchStatus = "idle";
        state.accManagerDetail = data;
        // console.log(state.accManagerDetail, "listtt");
      })
      .addCase(getAccManagerInfo.rejected, (state) => {
        state.fetchStatus = "idle";
      })
      .addCase(deleteAccManager.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(deleteAccManager.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        // console.log(payload, "payload");
        const { accountManger_id } = action.meta?.arg;
        // console.log(accountManger_id, "idd");
        if (payload?.data?.status) {
          state.list = state.list.filter(
            (item) => item.id !== accountManger_id
          );

          state.actionStatus = false;
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(deleteAccManager.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })
      .addCase(assignedAccManagerList.pending, (state) => {
        // state.actionStatus = false;
        // state.fetchStatus = "loading";
        // Reset error to null on success
      })
      .addCase(assignedAccManagerList.fulfilled, (state, action) => {
        state.fetchStatus = "idle";
        // console.log(action.payload.data, "klklk");
      })
      .addCase(assignedAccManagerList.rejected, (state, error) => {
        // state.fetchStatus = "idle";
        // toast.error(error?.message);
        console.log(error, "error");
        // state.actionStatus = false;
      })
      .addCase(accManagerClientList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(accManagerClientList.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        let newArray = data;
        newArray.unshift({ first_name: "All" });
        state.status = "idle";

        state.accClientList = newArray;
        // console.log(state.accManagerDetail, "jj");
      })
      .addCase(accManagerClientList.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateAccManagerList.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(updateAccManagerList.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
        } else {
          // console.log(action.payload.data, "action.payload");
          state.accManagerDetail = { ...response?.data };
          console.log(state.accManagerDetail, "accManagerDetail");
          toast.success(response?.message);
        }
      })
      .addCase(updateAccManagerList.rejected, (state, action) => {
        state.actionStatus = false;
      });
  },
});

export const {
  restAll,
  changeFetchStatus,
  resetFormManagrData,
} = accManagerSlice.actions;

export default accManagerSlice.reducer;
