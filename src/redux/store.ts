import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  // Reducer
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  // Middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
