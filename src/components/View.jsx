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
  const { id, address, imgUrl, rating, isSaved: initial, comments } = location.state;

  const [comment, setComment] = useState('');
  const [updatedComments, setUpdatedComments] = useState(location.state.comments);
  const [isSaved, setIsSaved] = useState(initial);

  const saveApartment = async (id) => {
    try {
      if (userID) {
        const response = await axios.put("http://localhost:3001/apartments", {
          id,
          userID,
        });
        console.log(response);
        setIsSaved(true);
        console.log("is saved", isSaved);
      } else {
        alert("Please log in to save!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = comment;
    const updatedCommentsList = [...updatedComments, newComment];

    axios
      .post("http://localhost:3001/apartments/update", {
        _id: location.state.id,
        comments: updatedCommentsList,
      })
      .then((response) => {
        setUpdatedComments(updatedCommentsList);
        setComment("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const commentList =
    updatedComments && updatedComments.map((com, index) => {
      return <CommentBox key={index} text={com} />;
    });

  return (
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div>{commentList}</div>
    </div>
  );
}