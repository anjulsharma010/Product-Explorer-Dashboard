import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Basic selectors
export const selectProductsState = (state: RootState) => state.products;
export const selectProducts = (state: RootState) => state.products.products;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectCategoriesLoading = (state: RootState) => state.products.categoriesLoading;
export const selectProductDetailLoading = (state: RootState) => state.products.productDetailLoading;
export const selectProductDetailError = (state: RootState) => state.products.productDetailError;

// Memoized selectors
export const selectProductsCount = createSelector(
  [selectProducts],
  (products) => products.length
);

export const selectProductById = (productId: number) =>
  createSelector([selectProducts], (products) =>
    products.find((product) => product.id === productId)
  );

export const selectProductsByCategory = (category: string) =>
  createSelector([selectProducts], (products) =>
    category ? products.filter((product) => product.category === category) : products
  );

export const selectUniqueCategories = createSelector(
  [selectProducts],
  (products) => [...new Set(products.map((product) => product.category))]
);
