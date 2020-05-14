import { combineReducers } from "redux";
import entetiesReducer from "./enteties";
import searchReducer from "./search";
import apiReducer from "./api";

export default combineReducers({
    enteties: entetiesReducer,
    search: searchReducer,
    loading: apiReducer
});
