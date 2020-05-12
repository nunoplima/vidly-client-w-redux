import React from "react";
import _ from "lodash";

const TBody = ({ data, columns }) => {
    return (
        <tbody>
             {data.map((item) => (
                <tr key={item._id}>
                    {columns.map(col => <td key={col.path || col.key}>{col.content ? col.content(item) : _.get(item, col.path)}</td>)}
                </tr>
            ))}
        </tbody>
    );
};

export default TBody;
