import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { favoritesReducer, productsReducer } from './slices';
import rootSaga from './sagas';

// Root reducer
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  products: productsReducer,
});

// Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

// Store singleton for client-side
let clientStore: AppStore | undefined;

function makeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const newStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false, // Disable thunk since we're using saga
        serializableCheck: {
          // Ignore these action types for serializable check
          ignoredActions: ['persist/PERSIST'],
        },
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  // Only run saga on client side
  if (typeof window !== 'undefined') {
    sagaMiddleware.run(rootSaga);
  }

  return newStore;
}

export function getStore() {
  // Always create a new store on the server
  if (typeof window === 'undefined') {
    return makeStore();
  }

  // Create the store once in the client
  if (!clientStore) {
    clientStore = makeStore();
  }

  return clientStore;
}

// Export store getter for provider
export const store = getStore;



