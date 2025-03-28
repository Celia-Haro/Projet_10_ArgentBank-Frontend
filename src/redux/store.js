import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from "./authSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    // Ajout d'autres reducers ici ( comptes transactions)
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuration du store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // utile pour éviter des warnings avec redux-persist
        }),
});

// Création du persistor pour persister le store
const persistor = persistStore(store);

// Export du store et du persistor
export { store, persistor };