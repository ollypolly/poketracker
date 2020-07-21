import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import cardListReducer from "../pages/CardList/cardListSlice";

export const store = configureStore({
  reducer: {
    cardList: cardListReducer,
  },
  middleware: [...getDefaultMiddleware({ immutableCheck: false })],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
