import { configureStore } from "@reduxjs/toolkit";
import mediaSlice from "../mediaSlice";

export const store = configureStore({
  reducer: {
    media: mediaSlice,
  },
});

export default store;
