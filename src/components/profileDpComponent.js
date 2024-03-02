import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import img from '../images/defaultPic.webp';
import { PiStudentDuotone } from "react-icons/pi";
import { RiBuilding2Line } from "react-icons/ri";

export default function ProfileDpComponent(props){
    
    return(
        <Container className="d-flex justify-content-center">
            <Row style={{gap:'20vw'}}>
                <Col>
                    <Image src={img} roundedCircle style={{width: '10rem', padding:'0.5rem'}}/>
                </Col>
                <Col className="d-flex align-items-center justify-content-start">
                    <Row className="align-items-center">
                        <Button variant="primary" size="sm" style={{marginRight: '5px'}}>Edit Profile</Button>
                        {
                            props.userType==="Student"
                            ?(
                                <p style={{marginTop: '2vh', textAlign: 'center'}}><PiStudentDuotone /> Student</p> 
                            )
                            :props.userType==="Employee"
                            ?(
                                <p style={{marginTop: '2vh', textAlign: 'center'}}><RiBuilding2Line /> Employee</p>
                            )
                            :(
                                <p style={{marginTop: '2vh', textAlign: 'center'}}> Yet to fill</p>
                            )
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}