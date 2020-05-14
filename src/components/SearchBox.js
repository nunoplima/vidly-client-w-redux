import React from "react";

const SearchBox = ({ onChange, value }) => {
    return (
        <input 
            className="form-control"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder="Search..."></input>
    );
};

export default SearchBox;
