import React from "react";
import { useSelector } from "react-redux";
import Like from "./common/Like";
import Table from "./common/Table";

const MoviesTable = ({ movies, onDelete, onLike, onSort }) => {
    const { sortColumn } = useSelector((state) => state.enteties.movies);

    const columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: (movie) => (
                <Like
                    isLiked={movie.liked}
                    itemId={movie._id}
                    onClick={onLike}
                />
            ),
        },
        {
            key: "delete",
            content: (movie) => (
                <button
                    onClick={() => onDelete(movie._id)}
                    className="btn btn-danger"
                    type="submit">
                    Delete
                </button>
            ),
        },
    ];

    return (
        <Table
            data={movies}
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
};

export default MoviesTable;
