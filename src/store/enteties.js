import { combineReducers } from "redux";
import moviesReducer from "./movies.js";
import genresReducer from "./genres.js";

export default combineReducers({
    movies: moviesReducer,
    genres: genresReducer
});
