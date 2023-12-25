import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

interface initialState {
  packs: [];
  currentPackId: number;
}
const initialState: initialState = {
  packs: [],
  currentPackId: 0,
};

export const getPacks = createAsyncThunk("getPacks", async () => {
  const response = await tidyTrekAPI.get("/packs");
  return await response;
});

export const editPackItem = createAsyncThunk("editPackItem", async (data) => {
  const { packItemId, packItem } = data;
  const response = await tidyTrekAPI.put(
    `/packs/pack/item/${packItemId}`,
    packItem
  );
  return await response;
});

const findAndReplacePackItem = (obj, newItem) => {
  for (let index in obj.categories) {
    const foundIndex = obj.categories[index].items.findIndex(
      (item) => item.itemId === 1
    );
    if (foundIndex >= 0) {
      obj.categories[index].items[foundIndex] = newItem;
      return obj;
    }
  }
};

export const packSlice = createSlice({
  name: "packs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      const { payload } = action;
      state.packs = payload?.data || [];
      if (payload?.data.length) {
        state.currentPackId = payload.data[0].packId;
      }
    });
    builder.addCase(getPacks.rejected, () => {});
    builder.addCase(editPackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.data) {
        const pack = state.packs.filter(
          (item) => item.packId === state.currentPackId
        );
      }
    });
  },
});

// export const {} = packSlice.actions;
export default packSlice.reducer;
