import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getproducts } from "../../api/getproducts.js";
export const apiProduct = createAsyncThunk(
  "product/fetch",
  async ({ query }, thunkAPI) => {
    try {
      return await getproducts(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const initialState = {
  productList: [],
  totalProducts: 0,
  singleProduct: null,
  loading: false,
  error: null,
  cart: [],
  filters: {
    search: "",
    sort: {
      sortBy: "",
      order: "",
    },
    filter: "",
    rating: 0,
  },
};

const getProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchRd: (state, action) => {
      state.filters.search = action.payload;
    },

    ratingRd: (state, action) => {
      state.filters.rating = action.payload;
    },

    filterRd: (state, action) => {
      state.filters.filter = action.payload;
    },

    sortRd: (state, action) => {
      state.filters.sort.sortBy = action.payload.sortBy;
      state.filters.sort.order = action.payload.order;
    },

    addtoCart: (state, action) => {
      const product = action.payload;

      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
        });
      }
    },
    removeCart: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find((pro) => pro.id == product.id);

      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.cart = state.cart.filter((pro) => pro.id !== product.id);
      }
    },

    payment: (state, action) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.products) {
          state.productList = action.payload.products;
          state.totalProducts = action.payload.total;
          state.singleProduct = null;
        } else {
          state.singleProduct = action.payload;
        }
      })
      .addCase(apiProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  sortRd,
  searchRd,
  ratingRd,
  filterRd,
  addtoCart,
  removeCart,
  payment,
} = getProductSlice.actions;
export default getProductSlice.reducer;
