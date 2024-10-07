import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductSlice.js";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;