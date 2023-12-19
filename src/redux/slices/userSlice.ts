import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

const initialState = {
  isAuthenticated: false,
  authError: false,
  authErrorMessage: "",
  user: { user_id: "", name: "", email: "" },
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData) => {
    const { name, email, password } = formData;
    //TO DO form validation
    const response = await tidyTrekAPI.post("/register", {
      name,
      email,
      password,
    });
    return await response;
  }
);

export const checkAuthStatus = createAsyncThunk("checkAuthStatus", async () => {
  return await tidyTrekAPI.get("/auth/status");
});

export const signInUser = createAsyncThunk("signInUser", async (formData) => {
  const { email, password } = formData;
  const response = await tidyTrekAPI.post("/signin", { email, password });
  return await response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(signInUser.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      const { payload } = action;
      state.authError = true;
      if (payload && payload.authErrorMessage)
        state.authErrorMessage = payload.authErrorMessage;
    });
  },
});

export const { signOutUser } = authSlice.actions;
export default authSlice.reducer;
