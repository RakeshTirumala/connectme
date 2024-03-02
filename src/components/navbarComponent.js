import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { secondaryColor } from "../constants";
import { MdExplore } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiMessengerLogoFill } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar
      data-bs-theme="light"
      expand="lg"
      style={{ backgroundColor: secondaryColor}}
    >
      <Container>
        <Navbar.Brand>
          <Nav.Link
            as={Link}
            to="/explore"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            ConnectMe
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to={"/explore"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MdExplore /> Explore
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/network"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <FaPeopleGroup /> Network
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/messenger"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <PiMessengerLogoFill /> Messenger{" "}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/profile"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MdAccountCircle /> Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/settings"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <IoMdSettings /> Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
