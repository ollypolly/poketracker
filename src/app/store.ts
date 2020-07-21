import checkedCardsReducer from "./checkboxSlice";
import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import cardListReducer from "../pages/CardList/cardListSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const checkedPersistConfig = {
  key: "checkedCards",
  storage: storage,
};

export const store = configureStore({
  reducer: {
    cardList: cardListReducer,
    checkedCards: persistReducer(checkedPersistConfig, checkedCardsReducer),
  },
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    thunk,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
