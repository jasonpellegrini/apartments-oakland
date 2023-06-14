import React from "react"

export default function CommentBox(props) {
    return (
        <div>
            <h3>Anonymous</h3>
            <p>{props.text}</p>
        </div>
    )
}