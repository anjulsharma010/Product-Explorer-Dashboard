import { takeEvery, select, put } from 'redux-saga/effects';
import { Product } from '@/types';
import { addFavorite, removeFavorite, loadFavorites, setLoaded } from '../slices/favoritesSlice';

interface FavoritesState {
  favorites: Product[];
  isLoaded: boolean;
}

// Selector functions
const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites;

// Saga to persist favorites to localStorage whenever they change
function* persistFavorites(): Generator {
  // Guard for SSR
  if (typeof window === 'undefined') return;

  const favoritesState = (yield select(selectFavorites)) as FavoritesState;
  if (favoritesState.isLoaded) {
    try {
      localStorage.setItem('favorites', JSON.stringify(favoritesState.favorites));
    } catch (error) {
      console.error('Failed to persist favorites to localStorage', error);
    }
  }
}

// Initial load of favorites from localStorage
function* initializeFavorites(): Generator {
  // Guard for SSR
  if (typeof window === 'undefined') {
    yield put(setLoaded(true));
    return;
  }

  try {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      const favorites: Product[] = JSON.parse(stored);
      yield put(loadFavorites(favorites));
    } else {
      yield put(setLoaded(true));
    }
  } catch (error) {
    console.error('Failed to load favorites from localStorage', error);
    yield put(setLoaded(true));
  }
}

export function* favoritesSaga() {
  // Initialize favorites from localStorage
  yield* initializeFavorites();

  // Watch for add/remove actions and persist
  yield takeEvery([addFavorite.type, removeFavorite.type], persistFavorites);
}

export default favoritesSaga;
