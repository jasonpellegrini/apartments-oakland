import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./navbar.css";

export default function CustomNavbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid className="px-4">
        <Navbar.Brand>
          <img
            id="logo"
            src="./src/assets/flats.png"
            height="40px"
            width="40px"
            alt="Logo"
          />
          <span id="titleFirstHalf">apartments</span>
          <span id="titleSecondHalf">oakland</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/saved" className="text-white">
              Saved
            </Nav.Link>
            <Nav.Link as={Link} to="/browse" className="text-white">
              Browse
            </Nav.Link>
            <Nav.Link as={Link} to="/post" className="text-white">
              Post
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={cookies.access_token ? "/" : "/auth"}
              className="text-white"
              onClick={logout}
            >
              {cookies.access_token ? "Logout" : "Login/Register"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}