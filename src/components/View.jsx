import React from "react"
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";
import { useLocation } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CommentBox from "./CommentBox";

export default function View(props) {
    const userID = useGetUserID();
    const location = useLocation();
    const { id, address ,imgUrl, rating, isSaved: initial, comments} = location.state;

    const [comment, setComment] = useState('');

    //const [savedApartments, setSavedApartments] = React.useState([]);
    const [isSaved, setIsSaved] = React.useState(initial);

    const saveApartment = async (id) => {
        console.log(id)
        try{
            if (userID) {
                const response = await axios.put("http://localhost:3001/apartments", {id, userID});
                console.log(response);
                setIsSaved(true);
                console.log("is saved", isSaved);
            } else {
                alert("Please log in to save!")
            }
            
        } catch (err) {
            console.error(err);
        }
    }


    const handleCommentChange = (event) => {
        setComment(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedComments = [...location.state.comments, comment];

        console.log("id",location.state.id)

        axios.post('http://localhost:3001/apartments/update', {
            _id: location.state.id,
            comments: updatedComments
        })
        .then( response => {
            console.log("made it to res")
        } )

        // Perform any necessary actions with the comment, e.g., send it to the server
        console.log("hello!");
      };

    const commentList = location.state.comments.map((com) => {        
        return (
            <CommentBox 
                key={com}
                text={com}
            />
        ) 
         
    })

    return(
        <div className="card">
            <img src={location.state.imgUrl} className="card--image" />
            <button onClick={() => saveApartment(id)} disabled={isSaved}>
                {isSaved ? "Saved" : "Save"}
            </button>
            <p className="cardText">{location.state.address}</p>
            <p className="cardText">{location.state.rating} / 5.0</p>

            <div id="comment-box">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="comment">
                        <Form.Label>Leave a comment:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={handleCommentChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
            <div>
                {commentList}
            </div>
        </div>  
    )
}