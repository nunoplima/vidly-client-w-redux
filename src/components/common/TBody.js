import React from "react";
import Like from "./Like";
import _ from "lodash";

const TBody = ({ movies, columns, onDelete, onLike }) => {
    return (
        <tbody>
             {movies.map((movie) => (
                <tr key={movie._id}>
                    {columns.map(col => <td>{col.content ? col.content(movie) : _.get(movie, col.path)}</td>)}
                    {/* <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                        <button
                            onClick={() => onDelete(movie._id)}
                            className="btn btn-danger"
                            type="submit">
                            Delete
                        </button>
                    </td>
                    <td>
                        <Like
                            isLiked={movie.liked}
                            itemId={movie._id}
                            onClick={onLike}
                        />
                    </td> */}
                </tr>
            ))}
        </tbody>
    );
};

export default TBody;
