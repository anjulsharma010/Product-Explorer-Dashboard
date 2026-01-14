import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface FavoritesState {
  favorites: Product[];
  isLoaded: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  isLoaded: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavorites(state, action: PayloadAction<Product[]>) {
      state.favorites = action.payload;
      state.isLoaded = true;
    },
    addFavorite(state, action: PayloadAction<Product>) {
      const exists = state.favorites.some((p) => p.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((p) => p.id !== action.payload);
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
  },
});

export const { loadFavorites, addFavorite, removeFavorite, setLoaded } = favoritesSlice.actions;
export default favoritesSlice.reducer;
