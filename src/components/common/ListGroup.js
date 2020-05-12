import React from "react";

const ListGroup = ({ data, selected, onChange }) => {
    const renderClasses = item => {
        return item.name === selected.name ? "list-group-item active" : "list-group-item";
    }

    return (
        <ul className="list-group">
            {data.map((item) => (
                <li
                    key={item.name}
                    className={renderClasses(item)}
                    onClick={() => onChange(item)}
                    style={{ cursor: "pointer" }}>
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

export default ListGroup;
