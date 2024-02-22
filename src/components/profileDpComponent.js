import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import img from '../images/defaultPic.webp';
import { PiStudentDuotone } from "react-icons/pi";

export default function ProfileDpComponent(){
    return(
        <Container className="d-flex justify-content-center">
            <Row style={{gap:'20vw'}}>
                <Col>
                    <Image src={img} roundedCircle style={{width: '10rem', padding:'0.5rem'}}/>
                </Col>
                <Col className="d-flex align-items-center justify-content-start">
                    <Row className="align-items-center">
                        <Button variant="primary" size="sm" style={{marginRight: '5px'}}>Edit Profile</Button>
                        <p style={{marginTop: '2vh', textAlign: 'center'}}><PiStudentDuotone /> Student</p>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}