import React from "react";
import _ from "lodash";

const TBody = ({ data, columns }) => {
    const renderCell = ({ path, content }, item) => {
        return content ? content(item) : _.get(item, path);
    };

    return (
        <tbody>
             {data.map((item) => (
                <tr key={item._id}>
                    {columns.map(col => <td key={col.path || col.key}>{renderCell(col, item)}</td>)}
                </tr>
            ))}
        </tbody>
    );
};

export default TBody;
