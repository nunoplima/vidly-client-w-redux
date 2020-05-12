import React from "react";

const Like = ({ isLiked, itemId, onClick }) => {
    return (
        <i
            onClick={() => onClick(itemId)}
            className={isLiked ? "fa fa-heart" : "fa fa-heart-o"}
            area-hidden="true"
            style={{ cursor: "pointer" }}></i>
    );
};

export default Like;
