import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

interface InitialState {
  packList: [];
  pack: object;
  categories: [Category] | [];
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

export const addPackItem = createAsyncThunk(
  "addPackItem",
  async (packItem: { packId: number; packCategoryId: number }) => {
    const { packId, packCategoryId } = packItem;
    const response = await tidyTrekAPI.post("/packs/pack/item", {
      packId,
      packCategoryId,
    });
    return await response;
  }
);

export const editPackItem = createAsyncThunk(
  "editPackItem",
  async (data: { packItemId: number; packItem: PackItem }) => {
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

const getCategoryIdx = (categories: [], categoryId: number) => {
  return categories.findIndex(
    (item: PackItem) => item.packCategoryId === categoryId
  );
};

const getPackItemIdx = (category: Category, packItemId: number) => {
  return category.packItems.findIndex(
    (item: PackItem) => item.packItemId === packItemId
  );
};

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
    builder.addCase(addPackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.data) {
        const { packItem } = payload.data || {};
        const { packCategoryId } = packItem;
        const categoryIdx = getCategoryIdx(state.categories, packCategoryId);
        state.categories[categoryIdx].packItems.push(packItem);
      }
    });
    builder.addCase(addPackItem.rejected, () => {});
    builder.addCase(editPackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.data) {
        const { categories } = state;
        const { packItemId, packCategoryId } = payload.data;

        const categoryIdx = getCategoryIdx(categories, packCategoryId);
        const packItemIdx = getPackItemIdx(categories[categoryIdx], packItemId);

        if (categoryIdx >= 0 && packItemIdx >= 0) {
          state.categories[categoryIdx].packItems[packItemIdx] = payload.data;
        }
      }
    });
    builder.addCase(editPackItem.rejected, () => {});
    builder.addCase(deletePackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.data) {
        const { categories } = state;
        const { packItemId, packCategoryId } = payload.data.deletedItemIds;

        const categoryIdx = getCategoryIdx(categories, packCategoryId);
        const packItemIdx = getPackItemIdx(categories[categoryIdx], packItemId);

        if (categoryIdx >= 0 && packItemIdx >= 0) {
          state.categories[categoryIdx].packItems.splice(packItemIdx, 1);
        }
      }
    });
    builder.addCase(deletePackItem.rejected, () => {});
  },
});

// export const {} = packSlice.actions;
export default packSlice.reducer;
