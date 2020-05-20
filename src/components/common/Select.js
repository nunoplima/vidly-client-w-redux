import React from "react";

const Select = ({ label, name, options, value, error, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                className="form-control"
                name={name}
                onChange={(e) => onChange(e)}
                value={value}>
                <option value=""></option>
                {options.map((option) => (
                    <option
                        key={option.name}
                        value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;
