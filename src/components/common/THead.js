import React from "react";

const THead = ({ columns, sortColumn, onSort }) => {
    const handleClick = path => {
        const order =
            path === sortColumn.path
                ? sortColumn.order === "asc"
                    ? "desc"
                    : "asc"
                : "asc";

        onSort({ path, order });
    };

    const renderSortIcn = path => {
        if (path === sortColumn.path) {
            return <i className={sortColumn.order === "asc" ? "fa fa-sort-down" : "fa fa-sort-up"}></i>;
        } 
    };

    return (
        <thead>
            <tr>
                {columns.map(col => (
                    <th
                        key={col.label || col.key}
                        onClick={() => handleClick(col.path)}
                        path={col.path}
                        scope="col"
                        style={{ cursor: "pointer" }}>
                        {col.label} {renderSortIcn(col.path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default THead;
