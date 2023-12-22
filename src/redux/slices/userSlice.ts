import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

interface user {
  userId: string;
  name: string;
  email: string;
}
interface initialState {
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: boolean;
  authErrorMessage: string;
  user: user;
}
const initialState: initialState = {
  isAuthenticated: false,
  authLoading: false,
  authError: false,
  authErrorMessage: "",
  user: { userId: "", name: "", email: "" },
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

export const logOutUser = createAsyncThunk("logOutUser", async () => {
  await tidyTrekAPI.post("/auth/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthStatus.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(getAuthStatus.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload?.data?.isAuthenticated || false;
      state.authLoading = false;
      state.user = action.payload.data.user;
    });
    builder.addCase(getAuthStatus.rejected, (state) => {
      state.authError = true;
      state.authLoading = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.authError = true;
      state.authErrorMessage = "Oops. We had trouble creating your account.";
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(logInUser.rejected, (state) => {
      state.authError = true;
      state.authErrorMessage = "Oops. Wrong email or password.";
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state = initialState;
    });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
