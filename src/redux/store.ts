import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import packSlice from './packs/packSlice';

export const createStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      packs: packSlice,
    },
  });
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof store>;
