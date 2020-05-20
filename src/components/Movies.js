import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import SearchBox from "./SearchBox";
import Button from "./common/Button";
import {
    getMovies,
    restoreMovies,
    deleteMovie,
    toggleLikeMovie,
    selectPage,
    toggleSort,
    getSortedMoviesByGenre
} from "../store/movies";
import { getGenres, selectGenre } from "../store/genres";
import { searchQuery } from "../store/search";
import { deleteMovieCall } from "../services/moviesService";
import { allGenres } from "../constants";


const Movies = () => {
    const dispatch = useDispatch();
    const movies = useSelector(getSortedMoviesByGenre);
    const { pageSize, currentPage, sortColumn } = useSelector(state => state.enteties.movies);
    const { list: genres, selectedGenre } = useSelector(state => state.enteties.genres);
    const query = useSelector(state => state.search);

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getMovies());
    }, [dispatch]);

    const handleDelete = async movieId => {
        // optimistic update
        const moviesBackup = [...movies];
        try {
            dispatch(deleteMovie(movieId));
            await deleteMovieCall(movieId);
        } catch(e) {
            if (e.response && e.response.status === 404) {
                toast.error("Movie already deleted");
                dispatch(restoreMovies(moviesBackup));
            }
        }
    };
    
    const handleGenreChange = genre => {
        dispatch(searchQuery(""));
        dispatch(selectGenre(genre));
        handlePageChange(1);
    };
    
    const handleSearch = query => {
        if (selectedGenre._id) {
            dispatch(selectGenre(allGenres));
        }
        dispatch(searchQuery(query));
        handlePageChange(1);
    };
    
    const handlePageChange = page => dispatch(selectPage(page));

    const handleLike = movieId => dispatch(toggleLikeMovie(movieId));

    const handleSort = sortColumn => dispatch(toggleSort(sortColumn));
    
    const itemsCount = movies.length;
    
    const moviesInPage = movies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="row mt-5">
            <ListGroup 
                data={[allGenres, ...genres]} 
                selected={selectedGenre} 
                onChange={handleGenreChange} 
            />

            <div className="col ml-5">
                <Button classes="btn btn-primary mb-5" label="New movie" />

                {itemsCount > 0 ? <p>Showing {itemsCount} in the database.</p> : <p>No videos in the database</p>}

                <SearchBox onChange={handleSearch} value={query} />

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
