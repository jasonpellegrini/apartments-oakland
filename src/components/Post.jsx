import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

export default function Post() {
  const userID = useGetUserID();

  const [apartment, setApartment] = useState({
    address: "",
    description: "",
    imageUrl: "",
    rating: 0,
    userOwner: userID,
    comments: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApartment({ ...apartment, [name]: value });
  };

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!userID) {
      alert("Please sign in to post.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/apartments", apartment);
      alert("post created");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-post">
      <h2>Create a Post</h2>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="address">Address</FormLabel>
          <FormControl
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="description">Description</FormLabel>
          <FormControl
            as="textarea"
            name="description"
            onChange={handleChange}
            rows="5"
            cols="20"
            id="description"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="rating">Rating</FormLabel>
          <FormControl
            type="number"
            id="rating"
            name="rating"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
          <FormControl
            type="text"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </div>
  )
}