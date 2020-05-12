import React from "react";

const THead = ({ columns, sortColumn, onSort }) => {
    const handleClick = (path) => {
        const order =
            path === sortColumn.path
                ? sortColumn.order === "asc"
                    ? "desc"
                    : "asc"
                : "asc";

        onSort({ path, order });
    };

    return (
        <thead>
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.label || col.key}
                        onClick={() => handleClick(col.path)}
                        path={col.path}
                        scope="col">
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default THead;
