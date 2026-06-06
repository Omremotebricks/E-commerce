import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import AuthReducer from "./slice/authSlice.js";
import GetProductReducer from "./slice/getProductSlice.js";
import ThemeReducer from "./slice/themeSlice.js";

const authPersistConfig = {
  key: "auth",
  storage,
};
const themePersistConfig = {
  key: "theme",
  storage,
};
const productPersistConfig = {
  key: "theme",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, ThemeReducer);
const persistedProductReducer = persistReducer(
  productPersistConfig,
  GetProductReducer,
);

export const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    product: persistedProductReducer,
    auth: persistedAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
