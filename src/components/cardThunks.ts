import { createAsyncThunk } from "@reduxjs/toolkit";
import { cardClient } from "../network/cardClient";

export const fetchCardsBySet = createAsyncThunk('fetch/cardsBySet', async (code: string) => {
    const response = await cardClient.getCardsForSet(code);
    return response;
})