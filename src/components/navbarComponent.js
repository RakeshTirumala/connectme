import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { primaryColor, secondaryColor } from "../constants";
import { MdExplore } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiMessengerLogoFill } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import ConnectMeLogoV1 from '../images/ConnectMeLogoV1.png'
import ConnectMeLogoV2W from '../images/ConnectMeLogoV2W.png'

export default function NavbarComponent(props) {
  return (
    <Navbar
      data-bs-theme="light"
      expand="lg"
      style={{ backgroundColor: props.background,borderBottom: `1px solid ${primaryColor}`}}
    >
      <Container>
        <Navbar.Brand>
          <Nav.Link
            as={Link}
            to="/explore"
            style={{ textDecoration: "none", color:props.fontColor}}
          >
            {
              (props.themeData)
              ?(
                <Image src={ConnectMeLogoV2W} style={{ width: "8vw"}}/>
              )
              :(
                <Image src={ConnectMeLogoV1} style={{ width: "8vw"}}/>
              )
            }
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to={"/explore"}
              style={{ textDecoration: "none", color:props.fontColor}}
            >
              <MdExplore /> Explore
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/network"}
              style={{ textDecoration: "none", color:props.fontColor}}
            >
              <FaPeopleGroup /> Network
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/messenger"}
              style={{ textDecoration: "none", color:props.fontColor}}
            >
              <PiMessengerLogoFill /> Messenger{" "}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/profile"}
              style={{ textDecoration: "none", color:props.fontColor}}
            >
              <MdAccountCircle /> Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/settings"}
              style={{ textDecoration: "none", color:props.fontColor}}
            >
              <IoMdSettings /> Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
