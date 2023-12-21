import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

const initialState = {
  isAuthenticated: false,
  authLoading: false,
  authError: false,
  authErrorMessage: "",
  user: { user_id: "", name: "", email: "" },
};

export const getAuthStatus = createAsyncThunk("checkAuthStatus", async () => {
  return await tidyTrekAPI.get("/auth/status");
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData: { email: string; name: string; password: string }) => {
    const { name, email, password } = formData;
    //TO DO form validation
    const response = await tidyTrekAPI.post("/auth/register", {
      name,
      email,
      password,
    });
    return await response;
  }
);

export const logInUser = createAsyncThunk(
  "logInUser",
  async (formData: { email: string; password: string }) => {
    const { email, password } = formData;
    const response = await tidyTrekAPI.post("/auth/login", {
      email,
      password,
    });
    return await response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthStatus.pending, (state, action) => {
      state.authLoading = true;
    });
    builder.addCase(getAuthStatus.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload?.data?.isAuthenticated || false;
      state.authLoading = false;
      state.user = action.payload.data.user;
    });
    builder.addCase(getAuthStatus.rejected, (state, action) => {
      const { payload } = action;
      state.authError = true;
      state.authLoading = false;
      if (payload && payload?.authErrorMessage) {
        state.authErrorMessage = payload.authErrorMessage;
      }
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      const { payload } = action;
      state.authError = true;
      if (payload && payload.authErrorMessage)
        state.authErrorMessage = payload.authErrorMessage;
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      const { payload } = action;
      state.authError = true;
      if (payload && payload.authErrorMessage)
        state.authErrorMessage = payload.authErrorMessage;
    });
  },
});

export const { signOutUser } = authSlice.actions;
export default authSlice.reducer;
