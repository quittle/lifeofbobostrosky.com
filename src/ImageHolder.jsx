import React from "react";

export default function ImageHolder(props) {
    return (<div>
        <img src={props.img} alt={props.alt ?? "unknown"} />
        <div>{props.children}</div>
    </div>);
}