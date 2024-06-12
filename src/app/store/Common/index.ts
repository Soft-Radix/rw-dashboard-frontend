import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiHelperFunction from "src/api";

export const getUserIdInfo: any = createAsyncThunk(
  "get-assigned-userIds",
  async () => {
    const response = await ApiHelperFunction({
      url: `get-assigned-userIds`,
      method: "get",
    });

    // Return only the data you need to keep it serializable
    return {
      data: response.data,
    };
  }
);
