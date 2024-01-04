import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./packTypes";
import { getCategoryIdx, getPackItemIdx } from "./packUtils";
import {
  getDefaultPack,
  addPackItem,
  editPackItem,
  deletePackItem,
  addPackCategory,
  editPackCategory,
  deletePackCategory,
  deleteCategoryAndItems,
} from "./packThunks";

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
    builder.addCase(addPackCategory.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        const { packCategory } = payload;
        state.categories.push(packCategory);
      }
    });
    builder.addCase(addPackCategory.rejected, () => {});
    builder.addCase(editPackCategory.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        const { packCategory } = payload;
        const { categories } = state;
        const categoryIdx = getCategoryIdx(
          categories,
          packCategory.packCategoryId
        );
        if (categoryIdx >= 0) {
          // editPackCategory does NOT return packItems (unchanged)
          // keep existing packItems property in redux
          state.categories[categoryIdx] = {
            ...state.categories[categoryIdx],
            ...packCategory,
          };
        }
      }
    });
    builder.addCase(editPackCategory.rejected, () => {});
    builder.addCase(deletePackCategory.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        const { categories } = state;
        const categoryIdx = getCategoryIdx(categories, payload.deletedId);
        state.categories.splice(categoryIdx, 1);
      }
    });
    builder.addCase(deletePackCategory.rejected, () => {});
    builder.addCase(deleteCategoryAndItems.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        const { categories } = state;
        const categoryIdx = getCategoryIdx(categories, payload.deletedId);
        state.categories.splice(categoryIdx, 1);
      }
    });
  },
});

export default packSlice.reducer;
