import React from "react";

const Input = ({ label, value, name, type, error, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                onChange={onChange}
                className="form-control"
                id={name}
                type={type}
                name={name}
                value={value}></input>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
