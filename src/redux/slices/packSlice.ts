import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

interface InitialState {
  packList: [];
  pack: object;
  categories: [Category];
}

interface EditPackItemArguments {
  packItemId: number;
  packItem: object;
}

interface Category {
  packItems: [PackItem];
}

interface PackItem {
  packItemId: number;
  packCategoryId: number;
}

export const getDefaultPack = createAsyncThunk("getDefaultPack", async () => {
  const response = await tidyTrekAPI.get("/packs");
  return await response;
});

export const editPackItem = createAsyncThunk(
  "editPackItem",
  async (data: EditPackItemArguments) => {
    const { packItemId, packItem } = data;
    const response = await tidyTrekAPI.put(
      `/packs/pack/item/${packItemId}`,
      packItem
    );
    return await response;
  }
);

export const deletePackItem = createAsyncThunk(
  "deletePackItem",
  async (packItemId: number) => {
    const response = await tidyTrekAPI.delete(`/packs/pack/item/${packItemId}`);
    return await response;
  }
);

const initialState: InitialState = {
  packList: [],
  pack: {},
  categories: [],
};

export const packSlice = createSlice({
  name: "packs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDefaultPack.fulfilled, (state, action) => {
      const { packList = [], pack = {}, categories = [] } = action.payload.data;
      state.packList = packList;
      state.pack = pack;
      state.categories = categories;
    });
    builder.addCase(getDefaultPack.rejected, () => {});
    builder.addCase(editPackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.data) {
        const categoryIndex = state.categories.findIndex(
          (item: PackItem) =>
            item.packCategoryId === payload.data.packCategoryId
        );
        const packItemIndex = state.categories.findIndex(
          (item: PackItem) => item.packItemId === payload.data.packItemId
        );
        if (categoryIndex && packItemIndex) {
          state.categories[categoryIndex].packItems[packItemIndex] =
            payload.data;
        }
      }
    });
    builder.addCase(deletePackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.data) {
        const { packItemId, packCategoryId } = payload.data.deletedItemIds;
        const categoryIndex = state.categories.findIndex(
          (item: PackItem) =>
            item.packCategoryId === payload.data.packCategoryId
        );
        const packItemIndex = state.categories.findIndex(
          (item: PackItem) => item.packItemId === payload.data.packItemId
        );
        if (categoryIndex && packItemIndex) {
          state.categories[categoryIndex].packItems.splice(packItemIndex, 1);
        }
      }
    });
    builder.addCase(deletePackItem.rejected, () => {});
  },
});

// export const {} = packSlice.actions;
export default packSlice.reducer;
