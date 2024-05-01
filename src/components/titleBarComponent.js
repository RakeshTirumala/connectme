import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { primaryColor, secondaryColor } from "../constants";
import ConnectMeLogoV1 from '../images/ConnectMeLogoV1.png'
import {Image} from 'react-bootstrap'

export default function TitleBarComponent(props) {
  return (
    <Navbar data-bs-theme="light" style={{ backgroundColor: 'white',  borderBottom: `1px solid ${primaryColor}`}}>
      <Container>
        <Navbar.Brand>
          <Image src={ConnectMeLogoV1} style={{ width: "8vw", minWidth:'100px'}} fluid/>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
