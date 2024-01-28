import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/userApiSlice';
import { packApi } from './pack/packApiSlice';

export const createStore = () => {
	return configureStore({
		reducer: {
			[userApi.reducerPath]: userApi.reducer,
			[packApi.reducerPath]: packApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(userApi.middleware).concat(packApi.middleware),
	});
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof store>;
