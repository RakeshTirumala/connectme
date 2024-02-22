import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { primaryColor, secondaryColor } from "../constants";
import { MdExplore } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiMessengerLogoFill } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
    return (
        <Navbar data-bs-theme="light" expand="lg" style={{ backgroundColor: secondaryColor }}>
            <Container>
                <Navbar.Brand>ConnectMe</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to={"/explore"} style={{textDecoration:'none', color:'black'}}><MdExplore/> Explore</Link></Nav.Link>
                        <Nav.Link><Link to={"/network"} style={{textDecoration:'none', color:'black'}}><FaPeopleGroup/> Network</Link></Nav.Link>
                        <Nav.Link><Link to={"/messenger"} style={{textDecoration:'none', color:'black'}}><PiMessengerLogoFill/> Messenger </Link></Nav.Link>
                        <Nav.Link><Link to={"/profile"} style={{textDecoration:'none', color:'black'}}><MdAccountCircle/> Profile</Link></Nav.Link>
                        <Nav.Link ><Link to={"/settings"} style={{textDecoration:'none', color:'black'}}><IoMdSettings /> Settings</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
