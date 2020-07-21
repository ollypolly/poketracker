import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../network/request";

export const fetchCardsBySet = createAsyncThunk('fetch/cardsBySet', async (data: { set: string, pageSize: number }) => {
    return await request.getData('v1/cards', data);
})

export const fetchSets = createAsyncThunk('fetch/sets', async () => {
    return await request.getData('v1/sets');
})