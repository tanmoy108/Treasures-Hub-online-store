import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct, fetchFilterProduct, fetchAllCategories, fetchAllBrands, fetchProductById,postProduct, patchProduct } from './ProductAPI';

const initialState = {
  productArray: [],
  status: 'idle',
  totalCount: 0,
  categories: [],
  brands: [],
  specificProduct: null
};
export const productAsync = createAsyncThunk(
  'product/fetchAllProduct',
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);
export const filterproductAsync = createAsyncThunk(
  'product/fetchFilterProduct',
  async ({ filterSelect, sortSelect, pagination }) => {
    const response = await fetchFilterProduct(filterSelect, sortSelect, pagination);
    return response.data;
  }
);

export const categoryAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);
export const brandAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);
export const specificProductAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const postProductAsync = createAsyncThunk(
  'product/postProduct',
  async (newData) => {
    const response = await postProduct(newData);
    return response.data;
  }
);
export const patchProductAsync = createAsyncThunk(
  'product/patchProduct',
  async (newData) => {
    const response = await patchProduct(newData);
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSpecificProduct: (state) => {
      state.specificProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productArray = action.payload;
      })
      .addCase(filterproductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterproductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productArray = action.payload.products;
        state.totalCount = action.payload.totalItems;
      })
      .addCase(categoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(categoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(brandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(brandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(specificProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(specificProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.specificProduct = action.payload;
      })
      .addCase(postProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productArray.push(action.payload );
      })
      .addCase(patchProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.productArray.findIndex((item) => item.id === action.payload.id)
        state.productArray[index] = action.payload;
      });
  },
});

export const { clearSpecificProduct } = ProductSlice.actions;

export const selectProduct = (state) => state.products.productArray;
export const selectProductCount = (state) => state.products.totalCount;
export const selectCategoryCount = (state) => state.products.categories;
export const selectBrandCount = (state) => state.products.brands;
export const selectSpecificProduct = (state) => state.products.specificProduct;

export default ProductSlice.reducer;
