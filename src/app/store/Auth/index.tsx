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

      .addCase(logIn.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        if (payload?.status) {
          toast.success(payload?.message);
        } else {
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
        if (payload?.data?.status) {
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

export const {restAll} = authSlice.actions;

export default authSlice.reducer;
