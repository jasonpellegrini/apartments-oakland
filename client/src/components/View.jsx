import React, { useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import { useLocation } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import CommentBox from "./CommentBox";
import './view.css';

export default function View(props) {
  const userID = useGetUserID();
  const location = useLocation();
  const { id, address, imgUrl, rating, description, isSaved: initial, comments } = location.state;

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
        setIsSaved(true);
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

    if (!userID) {
      alert("Please log in to leave a comment!")
      return;
    }

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
    <Container fluid className="view-container">
      <Card className="view-card">
        <Row>
          <Col md={4} className="left-column">
            <Card.Img src={location.state.imgUrl} className="card--image" />
            <Button onClick={() => saveApartment(id)} disabled={isSaved}>
              {isSaved ? "Saved" : "Save"}
            </Button>
          </Col>
          <Col md={8} className="right-column">
            <Card.Body>
              <Card.Title className="title-text">{location.state.address}</Card.Title>
              <Card.Text className="rating-text">{location.state.rating} / 5.0</Card.Text>
              <Card.Text className="description-text">{location.state.description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>

        <Row>
          <Col>
            <div id="comment-box" className="comment-box">
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
            <div className="comment-container">
              <div className="comment-list">{commentList}</div>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}