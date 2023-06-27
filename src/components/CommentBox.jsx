import React from "react"

export default function CommentBox(props) {
    return (
        <div>
            <h5>Anonymous</h5>
            <p>{props.text}</p>
        </div>
    )
}