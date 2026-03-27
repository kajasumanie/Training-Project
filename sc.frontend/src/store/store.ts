import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import applicationReducer from '../appSlice';
import userAuthReducer from '../store/slices/authSlice';
import shoppingCartReducer from '../store/slices/cartSlice';
import { authApi } from '../api/authApi';
import productsApi from '../api/productsApi';
import ordersApi from '../api/ordersApi';
import userApi from '../api/userApi';
import { persistReducer, persistStore } from 'redux-persist';
import persistConfig from './persistConfig';

/**
 * Redux Store Configuration
 * Central state management with persistence and API integration
 * @author ADS
 */

// Wrap auth reducer with persistence
const persistedUserAuthReducer = persistReducer(persistConfig, userAuthReducer);

export const store = configureStore({
  reducer: {
    // Core application state
    application: applicationReducer,
    userAuth: persistedUserAuthReducer,
    
    // Feature-specific state
    shoppingCart: shoppingCartReducer,
    
    // API slices
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(
        authApi.middleware,
        productsApi.middleware,
        ordersApi.middleware,
        userApi.middleware
      )
});

export const persistor = persistStore(store);

// Type definitions for TypeScript support
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
