import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import {
  SubscriptionList,
  ClientType,
  initialStateProps,
  filterType,
  clientIDType,
  deleteClientType,
  UpdateProfilePayload,
  ChangePassword,
  AddSubscriptionList,
  AddLineItem,
  SubscriptionListItem,
  ProductAdd,
  ProductDelete,
  ProductUpdate,
  ClientInfo,
} from "./Interface";
import { calculatePageNumber } from "src/utils";
import { getAgentList } from "../Agent";

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

export const GetCountry = createAsyncThunk(
  "country-list",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `country-list?start=0&limit=-1`,
      method: "get",
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const getAllState = createAsyncThunk(
  "state-list",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `state-list/${payload?.data?.country_name}?start=0&limit=-1`,
      method: "get",
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (payload: any) => {
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

export const resetPassword = createAsyncThunk(
  "client/set-password-link",
  async (payload: clientIDType) => {
    const response = await ApiHelperFunction({
      url: `client/set-password-link`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const UpdateStatus = createAsyncThunk(
  "user/status-update",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: `user/status-update`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

// --------------subscription------

export const subscriptionList = createAsyncThunk(
  "product/list",
  async (payload: SubscriptionList) => {
    const response = await ApiHelperFunction({
      url: `product/list`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const addsubscription = createAsyncThunk(
  "client/add-subscription",
  async (payload: AddSubscriptionList) => {
    const response = await ApiHelperFunction({
      url: `client/add-subscription`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const addLineItem = createAsyncThunk(
  "line-item/add",
  async (payload: AddLineItem) => {
    const response = await ApiHelperFunction({
      url: `line-item/add`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const subscriptionListItem = createAsyncThunk(
  "client/subscription-list",
  async (payload: SubscriptionListItem) => {
    const response = await ApiHelperFunction({
      url: `client/subscription-list`,
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const subscriptionDetails = createAsyncThunk(
  "client/information",
  async (payload: clientIDType) => {
    const response = await ApiHelperFunction({
      url: `client/subscription-detail/${payload?.client_id}`,
      method: "get",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const subscriptionUpdateDetails = createAsyncThunk(
  "/product/detail/",
  async (payload: ProductDelete) => {
    const response = await ApiHelperFunction({
      url: `/product/detail/${payload?.product_id}`,
      method: "get",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

// ----*-------product-list-----

export const productAdd = createAsyncThunk(
  "product/add",
  async (payload: ProductAdd) => {
    const response = await ApiHelperFunction({
      url: `/product/add`,
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

export const productList = createAsyncThunk(
  "product/list",
  async (payload: SubscriptionList) => {
    const response = await ApiHelperFunction({
      url: `/product/list`,
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
export const productDetails = createAsyncThunk(
  "/product/detail/",
  async (payload: ProductDelete) => {
    const response = await ApiHelperFunction({
      url: `/product/detail/${payload?.product_id}`,
      method: "get",
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
  selectedColumn: [
    "Id",
    "Name",
    "Company Name",
    "Joining Date",
    "Subscription Status",
    "Account Status",
    "",
  ],
  assignedAgentDetail: [],
  assignAccManagerDetail: [],
  total_records: 0,
  agentTotal_records: 0,
  toatalPage: 0,
  managertotal_records: 0,
  actionStatusDisabled: false,
  actionStatusClient: false,
  resetActivity: [],
  fetchAgendaData: false,
};

export const addAssignAgents = createAsyncThunk(
  "client/assign-agents",
  async (payload: ClientType, { dispatch }) => {
    const response = await ApiHelperFunction({
      url: "client/assign-agents",
      method: "post",
      data: payload,
    });
    dispatch(
      GetAssignAgentsInfo({
        client_id: payload?.client_id,
        start: 0,
        limit: 10,
        search: "",
      })
    );
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const GetAssignAgentsInfo: any = createAsyncThunk(
  "client/assign-agents-list",
  async (payload: ClientInfo) => {
    const response = await ApiHelperFunction({
      url: "client/assign-agents-list",
      method: "post",
      data: payload,
    });
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const deleteAgentList = createAsyncThunk(
  "client/unassign-agent",
  async (payload: clientIDType, { dispatch }) => {
    const response = await ApiHelperFunction({
      url: "client/unassign-agent",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const getAssignAccMangerInfo: any = createAsyncThunk(
  "client/assign-account-manager-list",
  async (payload: ClientInfo & { loading?: boolean }) => {
    delete payload.loading;
    const response = await ApiHelperFunction({
      url: "client/assign-account-manager-list",
      method: "post",
      data: payload,
    });
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const getAssignAccMangerInfonew: any = createAsyncThunk(
  "client/assign-account-manager-list",
  async (payload: ClientInfo) => {
    const response = await ApiHelperFunction({
      url: "client/assign-account-manager-list",
      method: "post",
      data: payload,
    });
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const addAssignAccManager = createAsyncThunk(
  "client/assign-account-manager",
  async (payload: clientIDType, { dispatch }) => {
    const response = await ApiHelperFunction({
      url: "client/assign-account-manager",
      method: "post",
      data: payload,
    });

    dispatch(
      getAssignAccMangerInfo({
        client_id: payload.client_id,
        start: 0,
        limit: 10,
        search: "",
      })
    );

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const deleteAccManagerList = createAsyncThunk(
  "client/unassign-account-manager",
  async (payload: clientIDType) => {
    const response = await ApiHelperFunction({
      url: "client/unassign-account-manager",
      method: "post",
      data: payload,
    });
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const defaultAccManagerList = createAsyncThunk(
  "client/set-default-account-manager",
  async (payload: clientIDType, { dispatch }) => {
    const response = await ApiHelperFunction({
      url: "client/set-default-account-manager",
      method: "post",
      data: payload,
    });
    // dispatch(
    //   getAssignAccMangerInfo({
    //     client_id: payload.client_id,
    //     start: 0,
    //     limit: 10,
    //     search: "",
    //     loading: false,
    //   })
    // );
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const GetRecentActivityData = createAsyncThunk(
  "client/recent-activity",
  async (payload) => {
    const response = await ApiHelperFunction({
      url: "client/recent-activity",
      method: "get",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const GetAgendaData = createAsyncThunk(
  "client/task-list",
  async (payload: filterType) => {
    console.log(payload, "paylofghsdfhf");
    const response = await ApiHelperFunction({
      url: `client/task-list?start=${payload.start || 0}&limit=${
        payload.limit || 20
      }`,
      method: "get",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
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
        "Joining Date": 3,
        "Subscription Status": 4,
        "Account Status": 5,
        "": -1, // Place "Actions" at the end
      };

      let isExist = state.selectedColumn.indexOf(payload);
      if (isExist !== -1) {
        // check that state have atleast 2 values ["",(heading)]
        if (state.selectedColumn?.length > 2) {
          state.selectedColumn = state.selectedColumn.filter(
            (item) => item !== payload
          );
        }
        // console.log("state", state.selectedColumn[0]);
      } else {
        state.selectedColumn.push(payload);
      }

      // Sort selectedColumn based on predefined positions5
      state.selectedColumn.sort((a, b) => {
        // Check if either a or b is an empty string
        if (a === "") return 1; // Move empty string 'a' to the end
        if (b === "") return -1; // Move empty string 'b' to the end

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

    updateResetColumn: (state, { payload }) => {
      state.selectedColumn = payload;
    },
    // updateSelectedStatus: (state, { payload }) => {
    //   state?.clientDetail?.status = payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(subscriptionListItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(subscriptionListItem.fulfilled, (state, action) => {
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
      .addCase(subscriptionListItem.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(productList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productList.fulfilled, (state, action) => {
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
      .addCase(productList.rejected, (state, action) => {
        state.status = "idle";
      })
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
        state.actionStatusClient = true;
      })
      .addCase(deletClient.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        const { client_ids } = action.meta?.arg;
        // console.log(client_ids, "idd");
        if (payload?.data?.status) {
          state.list = state.list?.filter(
            (item) => !client_ids?.includes(item.id)
          );

          state.actionStatusClient = false;
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(deletClient.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatusClient = false;
      })

      .addCase(getClientList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientList.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.status = "idle";
        if (!response?.status) {
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
        // console.log(action, "action");
        const { data } = action.payload?.data;
        // console.log(data, "ggggg");

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
      })
      .addCase(resetPassword.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        const response = action.payload?.data;
        state.actionStatus = false;
        if (!response.status) {
          toast.error(response?.message);
        } else {
          toast.success(response?.message);
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.actionStatus = false;
      })
      .addCase(GetAssignAgentsInfo.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(GetAssignAgentsInfo.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        // console.log(data, "ggggg");

        state.assignedAgentDetail = data.list;
        state.totalAgent = data.total_logged_in_agent;
        // console.log(data?.total_records, "data?.total_records47474");

        state.agentTotal_records = calculatePageNumber(data?.total_records, 10);
        state.fetchStatus = "idle";

        // if (data.list.length === 0) {
        //   state.agentTotal_records = restAll();
        // }
        // console.log(state.assignedAgentDetail, "gggggff");
      })
      .addCase(GetAssignAgentsInfo.rejected, (state) => {
        state.fetchStatus = "idle";
      })
      .addCase(deleteAgentList.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(deleteAgentList.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        const { agent_id } = action.meta?.arg;
        // console.log(client_id, "iddff");
        state.actionStatus = false;
        if (payload?.data?.status) {
          state.assignedAgentDetail = state.assignedAgentDetail.filter(
            (item) => item.agent_id !== agent_id
          );

          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(deleteAgentList.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })
      .addCase(getAssignAccMangerInfo.pending, (state, action) => {
        const { loading } = action.meta?.arg;
        // console.log("====kkj", loading);
        state.actionStatus = true;
        // state.fetchStatus =
        //   loading === undefined ? "loading" : !loading ? "idle" : "loading";
        state.fetchStatus = loading;
      })

      .addCase(getAssignAccMangerInfo.fulfilled, (state, action) => {
        state.actionStatus = false;
        // console.log(action, "action");
        const { data } = action.payload?.data;
        // console.log(data.list, "ggggg");
        state.fetchStatus = "idle";
        state.assignAccManagerDetail = data.list;
        // console.log(state.assignAccManagerDetail, "detailss");
        state.managertotal_records = calculatePageNumber(
          data?.total_records,
          10
        );
      })
      // .addCase(getAssignAccMangerInfonew.pending, (state) => {
      //   state.actionStatus = true;
      //   state.fetchStatus = "idle";
      // })
      .addCase(getAssignAccMangerInfo.rejected, (state) => {
        state.actionStatus = false;
        state.fetchStatus = "idle";
      })
      .addCase(addAssignAgents.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(addAssignAgents.fulfilled, (state, action) => {
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
      .addCase(addAssignAgents.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })
      .addCase(addAssignAccManager.pending, (state) => {
        state.actionStatus = true;
      })
      .addCase(addAssignAccManager.fulfilled, (state, action) => {
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
      .addCase(addAssignAccManager.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatus = false;
      })
      .addCase(deleteAccManagerList.pending, (state) => {
        state.actionStatusDisabled = true;
      })
      .addCase(deleteAccManagerList.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        const { account_manager_id } = action.meta?.arg;
        // console.log(client_id, "iddff");
        state.actionStatusDisabled = false;
        if (payload?.data?.status) {
          state.assignAccManagerDetail = state.assignAccManagerDetail.filter(
            (item) => item.account_manager_id !== account_manager_id
          );
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(deleteAccManagerList.rejected, (state, { error }) => {
        toast.error(error?.message);
        state.actionStatusDisabled = false;
      })
      .addCase(GetRecentActivityData.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(GetRecentActivityData.fulfilled, (state, action) => {
        // console.log(action.payload?.data, "find");
        const { data } = action.payload?.data;
        // const { message } = action.payload?.data;
        // console.log(message, "checkrrr");
        state.fetchStatus = "idle";
        state.resetActivity = data;
      })
      .addCase(GetRecentActivityData.rejected, (state) => {
        state.fetchStatus = "idle";
      })
      .addCase(GetAgendaData.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchAgendaData = true;
      })
      .addCase(GetAgendaData.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        // console.log(data, "dashBoardAgendsdsdsda");
        state.fetchStatus = "idle";
        state.dashBoardAgenda = data.list;
        state.fetchAgendaData = false;
      })
      .addCase(GetAgendaData.rejected, (state) => {
        state.fetchStatus = "idle";
        state.fetchAgendaData = false;
      });
  },
});

export const {
  restAll,
  changeFetchStatus,
  updateSelectedColumn,
  sortColumn,
  updateResetColumn,
} = clientSlice.actions;

export default clientSlice.reducer;
