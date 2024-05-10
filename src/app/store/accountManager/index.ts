import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";

import { calculatePageNumber } from "src/utils";
import { AccManagerType, filterType, initialStateProps } from "./Interface";

/**
 * API calling
 */

export const addAccManager = createAsyncThunk(
  "accountManager/add",
  async (payload: AccManagerType) => {
    const response = await ApiHelperFunction({
      url: "accountManager/add",
      method: "post",
      data: payload,
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
    console.log(response.data, "response.data");

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
// export const getAgentInfo = createAsyncThunk(
//   "agent/information",
//   async (payload: agentIDType) => {
//     const response = await ApiHelperFunction({
//       url: `/agent/detail/${payload?.agent_id}`,
//       method: "post",
//       data: payload,
//     });

//     // Return only the data you need to keep it serializable
//     return {
//       data: response.data,
//     };
//   }
// );
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
      .addCase(getAccManagerList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAccManagerList.fulfilled, (state, action) => {
        const response = action.payload?.data;
        console.log(response, "response");
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
      .addCase(getAccManagerList.rejected, (state, action) => {
        state.status = "idle";
      });
    //   .addCase(getAgentInfo.pending, (state) => {
    //     state.fetchStatus = "loading";
    //   })
    //   .addCase(getAgentInfo.fulfilled, (state, action) => {
    //     const { data } = action.payload?.data;
    //     state.fetchStatus = "idle";
    //     state.agentDetail = data;
    //   })
    //   .addCase(getAgentInfo.rejected, (state) => {
    //     state.fetchStatus = "idle";
    //   });
  },
});

export const { restAll, changeFetchStatus } = accManagerSlice.actions;

export default accManagerSlice.reducer;
