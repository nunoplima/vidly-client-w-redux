import React from "react";
import { Link } from "react-router-dom";

const Button = ({ classes, label }) => {
    return (
        <Link to="/movies/new"><button className={classes}>{label}</button></Link>
    );
};

export default Button;