import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CheckedCardsState {
  checked: { [id: string]: string[] };
}

const initialState: CheckedCardsState = {
  checked: {},
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
  },
});

export const { checkCard } = checkedCardsSlice.actions;

export const selectChecked = (state: RootState) => state.checkedCards.checked;

export default checkedCardsSlice.reducer;
