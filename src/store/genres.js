import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { baseUrl } from "./config.json";


const genresSlice = createSlice({
    name: "genres",
    initialState: [],
    reducers: {
        genresRecieved: (state, action) => action.payload.genres
    }
});

export default genresSlice.reducer;
const { genresRecieved } = genresSlice.actions;

// actions creators
export const getGenres = () => (
    apiCallBegan({
        baseUrl,
        url: "/api/genres",
        onSuccess: genresRecieved.type
    })
);