import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";

interface InitialState {
  packs: Pack[];
  currentPackId: number;
}

interface EditPackItemArguments {
  packItemId: number;
  packItem: object;
}

interface Pack {
  packId: number;
  categories: [Categories];
}

interface Categories {
  items: [PackItem];
}

interface PackItem {
  packItemId: number;
  packId: number;
}

export const getPacks = createAsyncThunk("getPacks", async () => {
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

const findAndReplacePackItem = (pack: Pack, newPackItem: PackItem) => {
  const idToFind = newPackItem.packItemId;
  for (const index in pack.categories) {
    // change to for of loop for (const [val, index])
    const foundIndex = pack.categories[index].items.findIndex(
      (packItem) => packItem.packItemId === idToFind
    );
    if (foundIndex >= 0) {
      pack.categories[index].items[foundIndex] = newPackItem;
      return pack;
    }
  }
  return pack;
};

const initialState: InitialState = {
  packs: [],
  currentPackId: 0,
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
        const packIndex = state.packs.findIndex(
          (item) => item.packId === state.currentPackId
        );
        const newPack = findAndReplacePackItem(
          state.packs[packIndex],
          payload.data
        );
        state.packs[packIndex] = newPack;
      }
    });
  },
});

// export const {} = packSlice.actions;
export default packSlice.reducer;
