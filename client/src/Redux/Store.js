import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import UserReducer from './user/Auth.slice';
import ProductReducer from '../Redux/product/ProductSlice';
import FilterReducer from '../Redux/product/FilterSlice';
//import ProfileReducer from '../Redux/Profile/Profile';
import storage from 'redux-persist/lib/storage';


//you can add many reducer here...
const rootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    filter: FilterReducer,
    //profile: ProfileReducer,
});

const persistConfig = {
    key: 'root',
    storage, 
    version: 1,
};

//storing it in a local storage
const persistReducer2 = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducer2,
  //added a middleware to avoid error 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

