import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardListReducer from '../pages/cardListSlice';

export const store = configureStore({
  reducer: {
    cardList: cardListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
