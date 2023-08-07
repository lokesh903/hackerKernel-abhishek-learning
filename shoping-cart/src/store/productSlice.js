import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
export const fetchProduct = createAsyncThunk('products/fetch', async () => {
    try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
 } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
});
