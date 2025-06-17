import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from "redux-persist/lib/storage/session";
import { combineReducers } from 'redux';
import authReducer from "./authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
});

const rememberMe = localStorage.getItem("rememberMe") === "true";

const persistConfig = {
    key: 'root',
    storage: rememberMe ? storage : storageSession,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };