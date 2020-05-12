import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import {
    getMovies,
    deleteMovie,
    toggleLikeMovie,
    selectPage,
    toggleSort,
} from "../store/movies";

const Movies = () => {
    const dispatch = useDispatch();
    const { list: movies, pageSize, currentPage, sortColumn } = useSelector(
        (state) => state.enteties.movies
    );

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    const handlePageChange = (page) => dispatch(selectPage(page));

    const handleDelete = (movieId) => dispatch(deleteMovie(movieId));

    const handleLike = (movieId) => dispatch(toggleLikeMovie(movieId));

    const handleSort = (sortColumn) => dispatch(toggleSort(sortColumn));

    const itemsCount = movies.length;

    const sortedMovies = _.orderBy(movies, sortColumn.path, sortColumn.order);
    const moviesInPage = sortedMovies.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <>
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
        </>
    );
};

export default Movies;
