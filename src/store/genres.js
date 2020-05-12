import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { baseUrl } from "./config.json";


const genresSlice = createSlice({
    name: "genres",
    initialState: { list: [], selectedGenre: { name: "All genres" } },
    reducers: {
        genresRecieved: (genres, action) => {
            genres.list = action.payload.genres;
        },

        selectedGenre: (genres, action) => {
            genres.selectedGenre = action.payload;
        }
    }
});

export default genresSlice.reducer;
const { genresRecieved, selectedGenre } = genresSlice.actions;

// actions creators
export const getGenres = () => (
    apiCallBegan({
        baseUrl,
        url: "/api/genres",
        onSuccess: genresRecieved.type
    })
);

export const selectGenre = genre => selectedGenre(genre);