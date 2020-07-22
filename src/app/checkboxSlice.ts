import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CheckedCardsState {
  checked: { [id: string]: string[] };
  selectedSet: string;
  darkMode?: boolean;
}

const initialState: CheckedCardsState = {
  checked: {},
  selectedSet: "Rebel Clash",
};

export const checkedCardsSlice = createSlice({
  name: "checkedCards",
  initialState,
  reducers: {
    checkCard: (state, action) => {
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
    setSelectedSet: (state, action) => {
      state.selectedSet = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const {
  checkCard,
  setSelectedSet,
  setDarkMode,
} = checkedCardsSlice.actions;

export const selectChecked = (state: RootState) => state.checkedCards.checked;

export const selectSelectedSet = (state: RootState) =>
  state.checkedCards.selectedSet;

export const selectDarkMode = (state: RootState) => state.checkedCards.darkMode;

export default checkedCardsSlice.reducer;
