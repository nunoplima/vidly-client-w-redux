import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Joi from "joi-browser";
import Form from "./common/Form";
import { getGenres } from "../store/genres";
import { toggleLoading } from "../store/api";
import { getMovieCall, saveMovieCall } from "../services/moviesService";


const MovieForm = ({ match, history }) => {
    const dispatch = useDispatch();
    const { list: genres } = useSelector(state => state.enteties.genres);
    const { loading } = useSelector(state => state);

    const [movie, setMovie] = useState({ _id: "", title: "", genre: "", numberInStock: "", dailyRentalRate: "" });
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        dispatch(getGenres()); 
        populateMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const populateMovie = async() => {
        const { movieId } = match.params; 
        if (movieId && movieId !== "new") {
            try {
                dispatch(toggleLoading(true));
                const { data } = await getMovieCall(movieId);
                const { _id, title, genre: { name }, numberInStock, dailyRentalRate } = data.movie;
                const initialState = { _id, title, genre: name, numberInStock, dailyRentalRate };
                setMovie(initialState);
                dispatch(toggleLoading(false));
            } catch(error) {
                if (error.response && error.response.status === 404) {
                    dispatch(toggleLoading(false));
                    return history.replace("/not-found");
                } 
            }
        }
    };

    const schema = {
        title: Joi.string().min(1).max(12).required().label("Title"),
        _id: Joi.string().allow("").optional(),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    };

    const inputs = [
        { name: "title", type: "text", label: "Title", tag: "input" },
        { name: "genre", options: genres, label: "Genre", tag: "select" },
        { name: "numberInStock", type: "number", label: "Number in Stock", tag: "input" },
        { name: "dailyRentalRate", type: "number", label: "Rate", tag: "input" },
    ];

    const handleSubmit = async () => {
        await saveMovieCall(movie);
        return history.push("/");
    };

    return (
        <>
        {!loading ?
            <div>  
                <h1>Movie Form</h1>
                
                <Form
                    submitText="Save"
                    schema={schema}
                    inputs={inputs}
                    data={movie}
                    errors={errors}
                    setData={setMovie}
                    setErrors={setErrors}
                    onSubmit={handleSubmit}
                />
            </div>
            :
            <h1>LOADING...</h1>
        }
        </>
    );
};

export default MovieForm;