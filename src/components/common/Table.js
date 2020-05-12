import React from "react";
import THead from "./THead";
import TBody from "./TBody";

const Table = ({ data, columns, sortColumn, onSort, onDelete, onLike }) => {
    return (
        <table className="table">

            <THead columns={columns} sortColumn={sortColumn} onSort={onSort} />

            <TBody data={data} columns={columns} onDelete={onDelete} onLike={onLike} />
        
        </table>
    );
};

export default Table;