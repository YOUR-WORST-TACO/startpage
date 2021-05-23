import * as React from "react";

const C = (props) => {
    return (
        <span
            style={{
                whiteSpace: 'pre-wrap',
                color: props.color
            }}
        >
            {props.children}
        </span>
    )
}

export default C;
