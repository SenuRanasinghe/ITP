import { combineReducers, configureStore}  from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import voucherSlice from './voucher/voucherSlice';
import voucherReducer from './voucher/voucherSlice';
import { voucherFetch } from './voucher/voucherSlice';
import { voucherApi } from './voucher/voucherApi';
import cartReducer, { getCartTotal } from './cart/cartSlice';

const rootReducer = combineReducers({
    user:userReducer,
    voucher:voucherSlice,
    vouchers: voucherReducer,
    cart : cartReducer,
    [voucherApi.reducerPath] : voucherApi.reducer,

    });

const persistConfig = {
    key: 'root',
    version : 1,
    storage,

}

const persistedReducer = persistReducer (persistConfig , rootReducer);

export const store = configureStore({
    reducer :persistedReducer ,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false}).prepend(voucherApi.middleware),
});



store.dispatch(voucherFetch());
store.dispatch(getCartTotal());

export const persistor = persistStore(store); 