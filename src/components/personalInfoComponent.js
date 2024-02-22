import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { SlInfo } from "react-icons/sl";
import { currentUser, data } from "../data";

export default function PersonalInfoComponent(){
    return(
        <Container fluid className="mx-auto" style={{marginTop:'3vh'}}>
            <label 
            style={{marginLeft:'3vw',
            fontWeight:'bold',
            fontSize:'16px', 
            marginBottom:'2vh'}}>
                Personal Information <SlInfo /></label>

            <Container className="d-flex justify-content-center">
                <Row>
                    {/* First Name */}
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="First name"
                        aria-label="First name"
                        aria-describedby="basic-addon2"
                        value={currentUser.firstName}
                        disabled={true}
                        style={{boxShadow:'none'}}
                        />
                        <Button variant="outline-secondary" id="button-addon2"><FiEdit2 /></Button>
                    </InputGroup>
                    {/* Last Name */}
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="Last name"
                        aria-label="Last name"
                        aria-describedby="basic-addon2"
                        value={currentUser.lastName}
                        disabled={true}
                        style={{boxShadow:'none'}}
                        />
                        <Button variant="outline-secondary" id="button-addon2"><FiEdit2 /></Button>
                    </InputGroup>
                    {/* Email */}
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="Email address"
                        aria-label="Email address"
                        aria-describedby="basic-addon2"
                        disabled={true}
                        value={currentUser.email}
                        style={{boxShadow:'none'}}
                        />
                        <Button variant="outline-secondary" id="button-addon2"><FiEdit2 /></Button>
                    </InputGroup>
                    {/* Phone */}
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="Phone"
                        aria-label="Phone"
                        aria-describedby="basic-addon2"
                        disabled={true}
                        value={currentUser.mobile}
                        style={{boxShadow:'none'}}
                        />
                        <Button variant="outline-secondary" id="button-addon2"><FiEdit2 /></Button>
                    </InputGroup>
                </Row>
            </Container>
        </Container>
    )
}