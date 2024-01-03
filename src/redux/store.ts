import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import packSlice from "./packs/packSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    packs: packSlice,
  },
});

//Typescript types that will always reflect our store state and expected values
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
