import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import {
  ApiResponse,
  ForgotPassPayload,
  LoginPayload,
  LoginSocialPayload,
  SetPasswordType,
  TwoFactorAuthentication,
  initialStateProps,
  refreshToken,
} from "./Interface";

import { getLocalStorage } from "src/utils";
import { SubProjectIcon } from "public/assets/icons/navabarIcon";

// Define a type for the payload

export const initialState: initialStateProps = {
  status: "idle",
  email: "",
  userData: [],
  UserResponse: [],
  error: "",
  // navigation: [],
};

/**
 * API calling
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    const response = await ApiHelperFunction({
      url: "auth/login", // end point
      method: "post", // method
      data: payload, // payload data
    });

    let resData = response?.data;
    return resData;
  }
);

export const sociallogIn = createAsyncThunk(
  "auth/social-login",
  async (payload: LoginSocialPayload) => {
    const response = await ApiHelperFunction({
      url: "auth/social-login", // end point
      method: "post", // method
      data: payload, // payload data
    });

    let resData = response?.data;
    return resData;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (payload: ForgotPassPayload) => {
    const response = await ApiHelperFunction({
      url: "auth/forgot-password",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const restPassword = createAsyncThunk(
  "auth/reset-password",
  async (payload: ForgotPassPayload) => {
    const response = await ApiHelperFunction({
      url: "auth/reset-password",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const RefreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (payload: refreshToken) => {
    console.log("🚀 ~ payload:", payload.token);
    const response = await ApiHelperFunction({
      url: "auth/refresh-token",
      method: "get",
      headers: { Authorization: `Bearer ${payload.token}` },
    });
    // console.log(response, "response");
    // localStorage.setItem("response", JSON.stringify(response?.data?.data));
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
export const dashboardCount = createAsyncThunk(
  "get-dashboard-count",
  async (payload: any) => {
    const response = await ApiHelperFunction({
      url: "get-dashboard-count",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const UpdateSuccess = createAsyncThunk(
  "agent/complete-profile",
  async (payload: refreshToken) => {
    console.log("🚀 ~ payload:", payload.token);
    const response = await ApiHelperFunction({
      url: "agent/complete-profile",
      method: "get",
      headers: { Authorization: `Bearer ${payload.token}` },
    });
    // console.log(response, "response");
    // localStorage.setItem("response", JSON.stringify(response?.data?.data));
    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const verifyOtp = createAsyncThunk(
  "otp-verify",
  async (payload: ForgotPassPayload) => {
    const response = await ApiHelperFunction({
      url: "otp-verify",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const verify2faOtp = createAsyncThunk(
  "otp-verify",
  async (payload: any, token) => {
    const response = await ApiHelperFunction({
      url: "otp-verify",
      method: "post",
      data: payload.data,
      headers: { Authorization: `Bearer ${payload?.token}` },
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const setPassword = createAsyncThunk(
  "client/set-password",
  async (payload: SetPasswordType) => {
    const response = await ApiHelperFunction({
      url: "client/set-password",
      method: "post",
      data: payload,
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);

export const twoFactorAuthentication = createAsyncThunk(
  "user/two-factor-authentication",
  async (payload: TwoFactorAuthentication) => {
    const response = await ApiHelperFunction({
      url: "user/two-factor-authentication",
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

/**
 * The auth slice.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restAll: (state) => {
      state.error = "";

      // state.selectedColumn = [];
    },
  },
  extraReducers(builder) {
    builder

      .addCase(RefreshToken.fulfilled, (state, action) => {
        const { data } = action.payload as ApiResponse; // Assert type
        if (data.status) {
          state.userData = data?.data?.user?.subscription_and_docusign || [];
          state.UserResponse = data?.data;
          localStorage.setItem("response", JSON.stringify(data?.data));
          localStorage.setItem(
            "userData",
            JSON.stringify(data?.data?.user?.subscription_and_docusign || [])
          );
          localStorage.setItem("userDetail", JSON.stringify(data?.data?.user));
        }
      })
      // .addCase(verify2faOtp.fulfilled, (state, action) => {
      //   const { data } = action.payload as ApiResponse; // Assert type
      //   if (data.status) {
      //     state.userData = data?.data?.user?.subscription_and_docusign || [];
      //     state.UserResponse = data?.data;
      //     localStorage.setItem("response", JSON.stringify(data?.data));
      //     localStorage.setItem(
      //       "userData",
      //       JSON.stringify(data?.data?.user?.subscription_and_docusign || [])
      //     );
      //     localStorage.setItem("userDetail", JSON.stringify(data?.data?.user));
      //   }
      // })

      .addCase(logIn.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        console.log("===payload", payload);
        if (
          payload?.status == 1 &&
          payload?.data?.two_factor_authentication == 0
        ) {
          toast.success(payload?.message);
        } else {
          console.log("==inside ");
          // toast.error(payload?.message);
          state.error = payload?.message;
        }
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type

        if (payload?.data?.status) {
          state.email = action?.meta?.arg?.email;
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        const { data } = action.payload as ApiResponse;
        if (payload?.data?.status) {
          localStorage.setItem("response", JSON.stringify(data?.data));
          localStorage.setItem(
            "userData",
            JSON.stringify(data?.data?.user?.subscription_and_docusign || [])
          );
          localStorage.setItem("userDetail", JSON.stringify(data?.data?.user));
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      .addCase(restPassword.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        if (payload?.data?.status) {
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      });
  },
});

export const { restAll } = authSlice.actions;

export default authSlice.reducer;
