import { createAsyncThunk } from "@reduxjs/toolkit";
import { tidyTrekAPI } from "../../api/tidytrekAPI";
import { PackItem } from "./packTypes";

export const getDefaultPack = createAsyncThunk("getDefaultPack", async () => {
  const { data } = (await tidyTrekAPI.get("/packs")) || {};
  return await data;
});

export const addPackItem = createAsyncThunk(
  "addPackItem",
  async (packItem: { packId: number; packCategoryId: number }) => {
    const { packId, packCategoryId } = packItem;
    const { data } =
      (await tidyTrekAPI.post("/packs/pack-items", {
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
      `/packs/pack-items/${packItemId}`,
      packItem
    );
    return await data;
  }
);

export const deletePackItem = createAsyncThunk(
  "deletePackItem",
  async (packItemId: number) => {
    const { data } = await tidyTrekAPI.delete(
      `/packs/pack-items/${packItemId}`
    );
    return await data;
  }
);

export const addPackCategory = createAsyncThunk(
  "addPackCategory",
  async (packId: number) => {
    const { data } = await tidyTrekAPI.post(`/packs/categories/${packId}`);
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
      `/packs/categories/${packCategoryId}`,
      { packCategoryName }
    );
    return await data;
  }
);

export const deletePackCategory = createAsyncThunk(
  "deletePackCategory",
  async (categoryId: number) => {
    const { data } = await tidyTrekAPI.delete(
      `/packs/categories/${categoryId}`
    );
    return await data;
  }
);

export const deleteCategoryAndItems = createAsyncThunk(
  "deleteCategoryAndItems",
  async (categoryId: number) => {
    const { data } = await tidyTrekAPI.delete(
      `/packs/categories-items/${categoryId}`
    );
    return await data;
  }
);
