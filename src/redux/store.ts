import { configureStore } from '@reduxjs/toolkit';
import packSlice from './packs/packSlice';
import { userApi } from './user/userApiSlice';
import { newPacksApi } from './newPacks/newPacksApiSlice';
import { closetApi } from './closet/closetApiSlice';

export const createStore = () => {
	return configureStore({
		reducer: {
			[userApi.reducerPath]: userApi.reducer,
			[newPacksApi.reducerPath]: newPacksApi.reducer,
			[closetApi.reducerPath]: closetApi.reducer,
			packs: packSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(userApi.middleware)
				.concat(closetApi.middleware)
				.concat(newPacksApi.middleware),
	});
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof store>;
