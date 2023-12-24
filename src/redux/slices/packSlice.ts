import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

interface initialState {
  packs: [];
}
const initialState: initialState = {
  packs: [],
};

export const getPacks = createAsyncThunk("getPacks", async () => {
  const response = await tidyTrekAPI.get("/packs");
  return await response;
});

export const packSlice = createSlice({
  name: "packs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packs = action.payload?.data || [];
    });
    builder.addCase(getPacks.rejected, () => {});
  },
});

// export const {} = packSlice.actions;
export default packSlice.reducer;
