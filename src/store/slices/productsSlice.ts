import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface ProductsState {
  products: Product[];
  categories: string[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  categoriesLoading: boolean;
  categoriesError: string | null;
  productDetailLoading: boolean;
  productDetailError: string | null;
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  currentProduct: null,
  loading: false,
  error: null,
  categoriesLoading: false,
  categoriesError: null,
  productDetailLoading: false,
  productDetailError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Fetch all products
    fetchProductsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch categories
    fetchCategoriesRequest(state) {
      state.categoriesLoading = true;
      state.categoriesError = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
      state.categoriesLoading = false;
      state.categoriesError = null;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.categoriesLoading = false;
      state.categoriesError = action.payload;
    },

    // Fetch single product
    fetchProductRequest(state, _action: PayloadAction<string>) {
      void _action;
      state.productDetailLoading = true;
      state.productDetailError = null;
      state.currentProduct = null;
    },
    fetchProductSuccess(state, action: PayloadAction<Product>) {
      state.currentProduct = action.payload;
      state.productDetailLoading = false;
      state.productDetailError = null;
    },
    fetchProductFailure(state, action: PayloadAction<string>) {
      state.productDetailLoading = false;
      state.productDetailError = action.payload;
    },

    // Fetch products by category
    fetchProductsByCategoryRequest(state, _action: PayloadAction<string>) {
      void _action;
      state.loading = true;
      state.error = null;
    },
    fetchProductsByCategorySuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductsByCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear current product
    clearCurrentProduct(state) {
      state.currentProduct = null;
      state.productDetailError = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  fetchProductsByCategoryRequest,
  fetchProductsByCategorySuccess,
  fetchProductsByCategoryFailure,
  clearCurrentProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
