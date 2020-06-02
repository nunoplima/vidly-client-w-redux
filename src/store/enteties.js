import { combineReducers } from "redux";
import userReducer from "./user.js";
import moviesReducer from "./movies.js";
import genresReducer from "./genres.js";

export default combineReducers({
    user: userReducer,
    movies: moviesReducer,
    genres: genresReducer
});
