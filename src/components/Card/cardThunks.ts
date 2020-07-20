import { createAsyncThunk } from "@reduxjs/toolkit";
import { cardClient } from "../../network/cardClient";

export const fetchCardsBySet = createAsyncThunk('fetch/cardsBySet', async (data: { setName: string, totalCards: number }) => {
    const response = await cardClient.getCardsForSet({ set: data.setName, pageSize: data.totalCards });
    return response;
})