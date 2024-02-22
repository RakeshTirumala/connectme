import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { primaryColor, secondaryColor } from "../constants";

export default function TitleBarComponent(){
    return(
        <Navbar data-bs-theme="light" style={{backgroundColor:secondaryColor}}>
            <Container>
                <Navbar.Brand>ConnectMe</Navbar.Brand>
            </Container>
        </Navbar>
    )
}