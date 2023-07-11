import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "./hero.css";

export default function Hero() {
  return (
    <div id="hero" className="d-flex align-items-center">
      <Container>
        <main role="main" className="text-center">
          <h1 id="heroText">Find out the facts for your next South Oakland apartment.</h1>
          <Button variant="light" id="heroButton">
            <Link className="text-black" to={"/browse"}>
              GET STARTED
            </Link>
          </Button>
        </main>
      </Container>
    </div>
  );
}