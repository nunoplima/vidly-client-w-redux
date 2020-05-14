import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: "search",
    initialState: "",
    reducers: {
        searchedQuery: (search, action) => action.payload,
    }
});

export default searchSlice.reducer;
const { searchedQuery } = searchSlice.actions;

// actions creators
export const searchQuery = query => searchedQuery(query);