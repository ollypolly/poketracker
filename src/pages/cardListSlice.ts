import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CardData, SetData } from "../model/card.model";
import { fetchCardsBySet, fetchSets } from "./cardListThunks";

interface CardListState {
  cardsForCurrentSet?: CardData[];
  cardsLoading: boolean;
  sets?: SetData[];
  setsLoading: boolean;
  sidebar: boolean;
}

const initialState: CardListState = {
  cardsLoading: true,
  setsLoading: true,
  sidebar: false,
};

export const cardListSlice = createSlice({
  name: "cardList",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardsBySet.pending, (state) => {
      state.cardsLoading = true;
    });
    builder.addCase(fetchCardsBySet.rejected, (state, action) => {
      state.cardsLoading = false;
    });
    builder.addCase(fetchCardsBySet.fulfilled, (state, action) => {
      state.cardsLoading = false;
      state.cardsForCurrentSet = action.payload.cards;
    });
    builder.addCase(fetchSets.pending, (state) => {
      state.setsLoading = true;
    });
    builder.addCase(fetchSets.rejected, (state, action) => {
      state.setsLoading = false;
    });
    builder.addCase(fetchSets.fulfilled, (state, action) => {
      state.setsLoading = false;
      state.sets = action.payload.sets;
    });
  },
});

export const { setSidebar } = cardListSlice.actions;

export const selectCards = (state: RootState) =>
  state.cardList.cardsForCurrentSet;
export const selectCardsLoading = (state: RootState) =>
  state.cardList.cardsLoading;

export const selectSets = (state: RootState) => state.cardList.sets;
export const selectSetsLoading = (state: RootState) =>
  state.cardList.setsLoading;

export const selectSidebar = (state: RootState) => state.cardList.sidebar;

export default cardListSlice.reducer;
