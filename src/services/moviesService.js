import { baseUrl } from "../constants";
import http from "./httpService";

export const getMovieCall = async movieId => {
    return http.get(`${baseUrl}/api/movies/${movieId}`);
};

export const saveMovieCall = movie => {
    if (movie._id) {
        const tempMovie = { ...movie };
        delete tempMovie._id;
        const options = { data: movie };
        return http.put(`${baseUrl}/api/movies/${movie._id}`, options);
    } 
    const options = { data: movie };
    return http.post(`${baseUrl}/api/movies`, options);
};

export const deleteMovieCall = movieId => {
    return http.delete(`${baseUrl}/api/movies/${movieId}`);
};