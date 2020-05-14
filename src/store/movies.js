import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import _ from "lodash";
import { apiCallBegan } from "./api";
import { baseUrl } from "./config.json";


const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        list: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
    },
    reducers: {
        moviesRecieved: (movies, action) => {
            movies.list = action.payload.movies;
        },

        movieDeleted: (movies, action) => {
            movies.list = movies.list.filter(
                (movie) => movie._id !== action.payload._id
            );
        },

        movieLikeToggled: (movies, action) => {
            const { movie: editedMovie } = action.payload;
            const idx = movies.list.findIndex(
                (movie) => movie._id === editedMovie._id
            );
            movies.list[idx] = editedMovie;
        },

        pageSelected: (movies, action) => {
            movies.currentPage = action.payload;
        },

        sortToggled: (movies, action) => {
            movies.sortColumn = action.payload;
        },
    },
});

export default moviesSlice.reducer;
const {
    moviesRecieved,
    movieDeleted,
    movieLikeToggled,
    pageSelected,
    sortToggled,
} = moviesSlice.actions;

// actions creators
export const getMovies = () =>
    apiCallBegan({
        baseUrl,
        url: "/api/movies",
        onSuccess: moviesRecieved.type,
    });

export const deleteMovie = (_id) =>
    apiCallBegan({
        baseUrl,
        url: `/api/movies/${_id}`,
        method: "delete",
        onSuccess: movieDeleted.type,
        payload: { _id },
    });

export const toggleLikeMovie = (_id) =>
    apiCallBegan({
        baseUrl,
        url: `/api/movies/${_id}`,
        method: "patch",
        onSuccess: movieLikeToggled.type,
    });

export const selectPage = (page) => pageSelected(page);

export const toggleSort = (sortColumn) => sortToggled(sortColumn);

// selectors 
const filter = (movies, genre, query) => {
    if (query.length) {
        return movies.filter(movie => movie.title.toLowerCase().startsWith(query.toLowerCase()));
    }   
    if (genre._id) {
        return movies.filter(movie => movie.genre.name === genre.name);
    }
    return movies;
};


export const getSortedMoviesByGenre = createSelector(
    state => state.enteties.movies,
    state => state.enteties.genres.selectedGenre,
    state => state.search,
    ({ list: movies, sortColumn: { path, order } }, genre, query) => {
        const filteredMovies = filter(movies, genre, query);
        const sortedMovies = _.orderBy(filteredMovies, path, order);
        return sortedMovies;
    }
);

