import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ queryParams }, thunk) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/products?${queryParams}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        }
      );

      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCategory = createAsyncThunk(
  "product/getCategory",
  async (data, thunk) => {
    try {
      const res = await fetch(`http://localhost:8000/api/categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });

      const data = await res.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: false,
  show_add_products_Component_value: false,
  categorys: [],
  totalCount: 100,
  empty_data: false,
  currentPage: 1,
  perPage: 4,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    show_add_products_Component: (state, action) => {
      state.show_add_products_Component_value =
        !state.show_add_products_Component_value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.products = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.products = action.payload.data || [];
        state.products.length == 0
          ? (state.empty_data = true)
          : (state.empty_data = false);
        state.totalCount = action.payload.total;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log(action);
      })
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.categorys = [];
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.categorys = action.payload.data || [];
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

      });
  },
});

export const { show_add_products_Component } = productSlice.actions;

export default productSlice.reducer;
