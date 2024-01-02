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
  const { data } = (await tidyTrekAPI.get("/packs")) || {};
  return data;
});

export const addPackItem = createAsyncThunk(
  "addPackItem",
  async (packItem: { packId: number; packCategoryId: number }) => {
    const { packId, packCategoryId } = packItem;
    const { data } =
      (await tidyTrekAPI.post("/packs/pack/item", {
        packId,
        packCategoryId,
      })) || {};
    return await data;
  }
);

export const editPackItem = createAsyncThunk(
  "editPackItem",
  async (packInfo: { packItemId: number; packItem: PackItem }) => {
    const { packItemId, packItem } = packInfo;
    const { data } = await tidyTrekAPI.put(
      `/packs/pack/item/${packItemId}`,
      packItem
    );
    return await data;
  }
);

export const deletePackItem = createAsyncThunk(
  "deletePackItem",
  async (packItemId: number) => {
    const { data } = await tidyTrekAPI.delete(`/packs/pack/item/${packItemId}`);
    return await data;
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
      const { packList = [], pack = {}, categories = [] } = action.payload;
      state.packList = packList;
      state.pack = pack;
      state.categories = categories;
    });
    builder.addCase(getDefaultPack.rejected, () => {});
    builder.addCase(addPackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        const { packItem } = payload || {};
        const { packCategoryId } = packItem;
        const categoryIdx = getCategoryIdx(state.categories, packCategoryId);
        state.categories[categoryIdx].packItems.push(packItem);
      }
    });
    builder.addCase(addPackItem.rejected, () => {});
    builder.addCase(editPackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        const { categories } = state;
        const { packItemId, packCategoryId } = payload;

        const categoryIdx = getCategoryIdx(categories, packCategoryId);
        const packItemIdx = getPackItemIdx(categories[categoryIdx], packItemId);

        if (categoryIdx >= 0 && packItemIdx >= 0) {
          state.categories[categoryIdx].packItems[packItemIdx] = payload;
        }
      }
    });
    builder.addCase(editPackItem.rejected, () => {});
    builder.addCase(deletePackItem.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        const { categories } = state;
        const { packItemId, packCategoryId } = payload.deletedItemIds;

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
