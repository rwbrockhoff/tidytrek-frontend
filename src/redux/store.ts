import { configureStore } from '@reduxjs/toolkit';
import packSlice from './packs/packSlice';
import { userApi } from './user/userApiSlice';

export const createStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      packs: packSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof store>;
