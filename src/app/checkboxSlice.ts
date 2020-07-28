import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CheckedCardsState {
  checked: { [id: string]: string[] };
  selectedSet: string;
  darkMode?: boolean;
  favourites: string[];
}

const initialState: CheckedCardsState = {
  checked: {},
  selectedSet: "Rebel Clash",
  favourites: [],
};

export const checkedCardsSlice = createSlice({
  name: "checkedCards",
  initialState,
  reducers: {
    checkCard: (state, action) => {
      if (!state.checked) {
        state.checked = {};
      }
      if (state.checked[action.payload.set] && !action.payload.currentChecked) {
        state.checked[action.payload.set].push(action.payload.id);
      } else if (action.payload.currentChecked) {
        state.checked[action.payload.set].splice(
          state.checked[action.payload.set].indexOf(action.payload.id),
          1
        );
      } else {
        state.checked[action.payload.set] = [action.payload.id];
      }
    },
    checkAll: (state, action) => {
      state.checked[action.payload.id] = action.payload.cardIds;
    },
    uncheckAll: (state, action) => {
      state.checked[action.payload] = [];
    },
    setSelectedSet: (state, action) => {
      state.selectedSet = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    addFavourite: (state, action) => {
      state.favourites?.push(action.payload);
    },
    removeFavourite: (state, action) => {
      const index = state.favourites.indexOf(action.payload);
      state.favourites.splice(index, 1);
    },
    uploadCollection: (state, action) => {
      const data = action.payload;
      state.checked = JSON.parse(data);
    },
  },
});

export const {
  checkCard,
  setSelectedSet,
  setDarkMode,
  addFavourite,
  removeFavourite,
  checkAll,
  uncheckAll,
  uploadCollection,
} = checkedCardsSlice.actions;

export const selectChecked = (state: RootState) => state.checkedCards.checked;

export const selectSelectedSet = (state: RootState) =>
  state.checkedCards.selectedSet;

export const selectDarkMode = (state: RootState) => state.checkedCards.darkMode;

export const selectFavourites = (state: RootState) =>
  state.checkedCards.favourites;

export default checkedCardsSlice.reducer;
