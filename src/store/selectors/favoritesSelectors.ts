import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Basic selectors
export const selectFavoritesState = (state: RootState) => state.favorites;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectIsLoaded = (state: RootState) => state.favorites.isLoaded;

// Memoized selectors
export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);

export const selectIsFavorite = (productId: number) =>
  createSelector([selectFavorites], (favorites) =>
    favorites.some((product) => product.id === productId)
  );

export const selectFavoriteIds = createSelector(
  [selectFavorites],
  (favorites) => new Set(favorites.map((product) => product.id))
);
