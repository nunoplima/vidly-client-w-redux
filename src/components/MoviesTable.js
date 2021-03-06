import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Like from "./common/Like";
import Table from "./common/Table";

const MoviesTable = ({ movies, onDelete, onLike, onSort }) => {
    const user = useSelector(state => state.enteties.user);
    const { sortColumn } = useSelector((state) => state.enteties.movies);

    const columns = [
        {
            path: "title",
            label: "Title",
            content: movie => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            ),
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: movie => (
                <Like
                    isLiked={movie.liked}
                    itemId={movie._id}
                    onClick={onLike}
                />
            ),
        },
    ];

    const deleteColumn = {
        key: "delete",
        content: movie => (
            <button
                onClick={() => onDelete(movie._id)}
                className="btn btn-danger"
                type="submit">
                Delete
            </button>
        ),
    };

    if (Object.keys(user).length > 0) columns.push(deleteColumn);

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
