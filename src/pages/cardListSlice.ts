import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { CardData } from '../model/card.model';
import { fetchCardsBySet } from './cardListThunks';

interface CardListState {
  cardsForCurrentSet?: CardData[];
  cardsLoading: boolean;
}

const initialState: CardListState = {
  cardsLoading: true,
};

export const counterSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchCardsBySet.pending, (state) => {
      state.cardsLoading = true;
    })
    builder.addCase(fetchCardsBySet.rejected, (state, action) => {
      state.cardsLoading = false;
    })
    builder.addCase(fetchCardsBySet.fulfilled, (state, action) => {
      state.cardsLoading = false;
      state.cardsForCurrentSet = action.payload.cards
    })
  }
});

//export const {  } = counterSlice.actions;

export const selectCards = (state: RootState) => state.cardList.cardsForCurrentSet;
export const selectCardsLoading = (state: RootState) => state.cardList.cardsLoading;

export default counterSlice.reducer;
