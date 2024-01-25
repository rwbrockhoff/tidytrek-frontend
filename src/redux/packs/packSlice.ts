import { createSlice } from '@reduxjs/toolkit';
import { InitialState, Pack } from './packTypes';
import { getCategoryIdx, getPackItemIdx, getPackIdx } from './packUtils';
import {
	getDefaultPack,
	getPack,
	getPackList,
	addNewPack,
	editPack,
	movePack,
	deletePack,
	addPackItem,
	editPackItem,
	movePackItem,
	deletePackItem,
	addPackCategory,
	editPackCategory,
	deletePackCategory,
	deleteCategoryAndItems,
	deletePackAndItems,
} from './packThunks';

const initialState: InitialState = {
	packList: [],
	pack: {} as Pack,
	categories: [],
};

export const packSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getDefaultPack.fulfilled, (state, action) => {
			const { pack = {}, categories = [] } = action.payload;
			state.pack = pack;
			state.categories = categories;
		});
		builder.addCase(getDefaultPack.rejected, () => {});
		builder.addCase(getPackList.fulfilled, (state, action) => {
			const { packList } = action.payload;
			if (packList) state.packList = packList;
		});
		builder.addCase(getPackList.rejected, () => {});
		builder.addCase(getPack.fulfilled, (state, action) => {
			const { pack, categories } = action.payload;
			if (pack && categories) {
				state.pack = pack;
				state.categories = categories;
			}
		});
		builder.addCase(addNewPack.fulfilled, (state, action) => {
			const { payload } = action;
			if (payload) {
				const { pack, categories } = payload;
				state.pack = pack;
				state.categories = categories;
				state.packList.push({ packName: pack.packName, packId: pack.packId });
			}
		});
		builder.addCase(editPack.fulfilled, (state, action) => {
			const { payload } = action;
			if (payload?.updatedPack) {
				const { updatedPack } = payload;
				const { packId, packName } = updatedPack;
				const packIndex = getPackIdx(state.packList, packId);
				state.packList[packIndex].packName = packName;
				state.pack = updatedPack;
			}
		});
		builder.addCase(editPack.rejected, () => {});
		builder.addCase(movePack.fulfilled, (state, action) => {
			const { payload } = action;
			if (payload) {
				const { packId, newIndex } = payload;
				const currentIdx = getPackIdx(state.packList, packId);
				const item = state.packList.splice(currentIdx, 1);
				state.packList.splice(newIndex, 0, ...item);
			}
		});
		builder.addCase(deletePack.fulfilled, (state, action) => {
			const { payload } = action;
			const { deletedPackId } = payload;
			const { packList } = state;
			const packIdx = getPackIdx(packList, deletedPackId);
			packList.splice(packIdx, 1);
			state.pack = {} as Pack;
			state.categories = [];
		});
		builder.addCase(deletePackAndItems.fulfilled, (state, action) => {
			const { payload } = action;
			const { deletedPackId } = payload;
			const { packList } = state;
			const packIdx = getPackIdx(packList, deletedPackId);
			packList.splice(packIdx, 1);
			state.pack = {} as Pack;
			state.categories = [];
		});
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
		builder.addCase(movePackItem.fulfilled, (state, action) => {
			const { payload } = action;
			if (payload) {
				const { categories } = state;
				const { packCategoryId, packItemIndex, prevPackCategoryId, prevPackItemIndex } =
					payload;
				const prevCategoryIdx = getCategoryIdx(categories, prevPackCategoryId);
				const [packItemToMove] = categories[prevCategoryIdx].packItems.splice(
					prevPackItemIndex,
					1,
				);
				let newCategoryIdx;
				if (prevPackCategoryId !== packCategoryId) {
					newCategoryIdx = getCategoryIdx(categories, packCategoryId);
				} else newCategoryIdx = prevCategoryIdx;

				state.categories[newCategoryIdx].packItems.splice(
					packItemIndex,
					0,
					packItemToMove,
				);
			}
		});
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
				const categoryIdx = getCategoryIdx(categories, packCategory.packCategoryId);
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
