import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { primaryColor } from "../constants";
import { MdExplore } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiMessengerLogoFill } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
    return (
        <Navbar data-bs-theme="light" expand="lg" style={{ backgroundColor: primaryColor }}>
            <Container>
                <Navbar.Brand>ConnectMe</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><MdExplore /> <Link to={"/explore"} style={{textDecoration:'none', color:'black'}}>Explore</Link></Nav.Link>
                        <Nav.Link> <FaPeopleGroup /> <Link to={"/network"} style={{textDecoration:'none', color:'black'}}>Network</Link></Nav.Link>
                        <Nav.Link><PiMessengerLogoFill/> Messenger</Nav.Link>
                        <Nav.Link><MdAccountCircle/> Profile</Nav.Link>
                        <Nav.Link ><IoMdSettings /> <Link to={"/settings"} style={{textDecoration:'none', color:'black'}}>Settings</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
