import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "app/store/types";
import toast from "react-hot-toast";
import ApiHelperFunction from "src/api";
import {
  ApiResponse,
  ForgotPassPayload,
  LoginPayload,
  SetPasswordType,
  initialStateProps,
} from "./Interface";

import { getLocalStorage } from "src/utils";
import { SubProjectIcon } from "public/assets/icons/navabarIcon";

// Define a type for the payload

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
export const initialState: initialStateProps = {
  status: "idle",
  email: "",
  // navigation: [],
};

/**
 * The auth slice.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(logIn.pending, (state, action) => {})
      .addCase(logIn.fulfilled, (state, action) => {
        const payload = action.payload as ApiResponse; // Assert type
        if (payload?.status) {
          toast.success(payload?.message);
        } else {
          toast.error(payload?.message);
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

export const {} = authSlice.actions;

export default authSlice.reducer;
