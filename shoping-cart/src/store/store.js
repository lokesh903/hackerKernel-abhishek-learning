import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartsSlice';
import productReducer from './productSlice';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // Import the default storage object

const persistConfig = {
  key: 'root',
  version: 1,
  storage, // Assign the default storage object here
};

const reducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
