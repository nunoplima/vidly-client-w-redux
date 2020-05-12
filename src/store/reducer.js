import { combineReducers } from "redux";
import entetiesReducer from "./enteties";
import apiReducer from "./api";

export default combineReducers({
    enteties: entetiesReducer,
    loading: apiReducer
});
