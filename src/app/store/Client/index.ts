import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import {
  ClientType,
  initialStateProps,
  filterType,
  clientIDType,
  deleteClientType,
  UpdateProfilePayload,
  ChangePassword,
} from "./Interface";
import { calculatePageNumber } from "src/utils";

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

export const deletClient = createAsyncThunk(
  "client/delete",
  async (payload: deleteClientType) => {
    const response = await ApiHelperFunction({
      url: "client/delete",
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
      url: `client/detail/${payload?.client_id}`,
      method: "get",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const updateProfile = createAsyncThunk(
  "client/update-profile",
  async (payload: UpdateProfilePayload) => {
    const response = await ApiHelperFunction({
      url: `client/update-profile`,
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

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (payload: ChangePassword) => {
    const response = await ApiHelperFunction({
      url: `auth/change-password`,
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
  clientDetail: {},
  selectedColumn: [],
  total_records: 0,
};

/**
 * The auth slice.
 */
export const clientSlice = createSlice({
  name: "clientSlice",
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

      // Sort selectedColumn based on predefined positions5
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
      .addCase(addClient.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
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
      .addCase(addClient.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })
      .addCase(deletClient.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(deletClient.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        const { client_ids } = action.meta?.arg;
        console.log(client_ids, "idd");
        state.actionStatus = false;
        if (payload?.data?.status) {
          state.list = state.list?.filter(
            (item) => !client_ids?.includes(item.id)
          );
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(deletClient.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })

      .addCase(getClientList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientList.fulfilled, (state, action) => {
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
      .addCase(getClientList.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getClientInfo.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(getClientInfo.fulfilled, (state, action) => {
        console.log(action, "action");
        const { data } = action.payload?.data;
        console.log(data, "ggggg");
        state.fetchStatus = "idle";
        state.clientDetail = data;
      })
      .addCase(getClientInfo.rejected, (state) => {
        state.fetchStatus = "idle";
      })

      .addCase(updateProfile.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
        } else {
          state.clientDetail = { ...response?.data };
          toast.success(response?.message);
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.actionStatus = false;
      })

      .addCase(changePassword.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
        } else {
          toast.success(response?.message);
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.actionStatus = false;
      });
  },
});

export const { restAll, changeFetchStatus, updateSelectedColumn, sortColumn } =
  clientSlice.actions;

export default clientSlice.reducer;
