import { createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";
import { PackItem } from "./packTypes";

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

export const editPackCategory = createAsyncThunk(
  "editPackCategory",
  async (categoryInfo: {
    packCategoryId: number;
    packCategoryName: string;
  }) => {
    const { packCategoryId, packCategoryName } = categoryInfo;
    const { data } = await tidyTrekAPI.put(
      `/packs/pack/category/${packCategoryId}`,
      { packCategoryName }
    );
    return await data;
  }
);
