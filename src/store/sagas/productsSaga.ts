import { call, put, takeLatest, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import {
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
} from '../slices/productsSlice';

function* fetchProductsSaga() {
  try {
    const products: Product[] = yield call(productService.getProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch products';
    yield put(fetchProductsFailure(message));
  }
}

function* fetchCategoriesSaga() {
  try {
    const categories: string[] = yield call(productService.getCategories);
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch categories';
    yield put(fetchCategoriesFailure(message));
  }
}

function* fetchProductSaga(action: PayloadAction<string>) {
  try {
    const product: Product = yield call(productService.getProduct, action.payload);
    yield put(fetchProductSuccess(product));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch product';
    yield put(fetchProductFailure(message));
  }
}

function* fetchProductsByCategorySaga(action: PayloadAction<string>) {
  try {
    const products: Product[] = yield call(productService.getProductsByCategory, action.payload);
    yield put(fetchProductsByCategorySuccess(products));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch products by category';
    yield put(fetchProductsByCategoryFailure(message));
  }
}

export function* productsSaga() {
  yield all([
    takeLatest(fetchProductsRequest.type, fetchProductsSaga),
    takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga),
    takeLatest(fetchProductRequest.type, fetchProductSaga),
    takeLatest(fetchProductsByCategoryRequest.type, fetchProductsByCategorySaga),
  ]);
}

export default productsSaga;
