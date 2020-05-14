import React from "react";

const MovieForm = (props) => {
    return (
        <div>  
            <h1>Movie {`${props.match.params.movieId}`}</h1>
            
            <button className="btn btn-primary" onClick={() => props.history.push("/movies")}>Save</button>    
        </div>
    );
};

export default MovieForm;