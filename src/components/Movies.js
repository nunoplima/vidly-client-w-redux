import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import {
    getMovies,
    deleteMovie,
    toggleLikeMovie,
    selectPage,
    toggleSort,
    getSortedMoviesByGenre
} from "../store/movies";
import { getGenres, selectGenre } from "../store/genres";

const Movies = () => {
    const dispatch = useDispatch();
    const movies = useSelector(getSortedMoviesByGenre);
    const { pageSize, currentPage, sortColumn } = useSelector(state => state.enteties.movies);
    const { list: genres, selectedGenre } = useSelector(state => state.enteties.genres);

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getMovies());
    }, [dispatch]);

    const handlePageChange = page => dispatch(selectPage(page));

    const handleDelete = movieId => dispatch(deleteMovie(movieId));

    const handleLike = movieId => dispatch(toggleLikeMovie(movieId));

    const handleSort = sortColumn => dispatch(toggleSort(sortColumn));

    const handleGenreChange = genre => {
        dispatch(selectGenre(genre));
        handlePageChange(1);
    };

    const itemsCount = movies.length;
    
    const moviesInPage = movies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="row mt-5">
            <ListGroup 
                data={[{ name: "All genres" }, ...genres]} 
                selected={selectedGenre} 
                onChange={handleGenreChange} 
            />

            <div className="col ml-5">
                {itemsCount > 0 && <p>Showing {itemsCount} in the database.</p>}

                <MoviesTable
                    movies={moviesInPage}
                    sortColumn={sortColumn}
                    onDelete={handleDelete}
                    onLike={handleLike}
                    onSort={handleSort}
                />

                <Pagination
                    itemsCount={itemsCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Movies;
