import React from "react";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    let pagesArr = new Array(Math.ceil(itemsCount / pageSize)).fill(null);
    pagesArr.map((el, i) => (pagesArr[i] = i + 1));
    // or lodash range

    if (itemsCount <= pageSize) return null;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pagesArr.map(page => (
                    <li key={page} onClick={() => onPageChange(page)} className={currentPage === page ? "page-item active" : "page-item"}>
                        <a className="page-link" href="#">{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
