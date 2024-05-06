import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { PiStudentDuotone } from "react-icons/pi";
import { RiBuilding2Line } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { PiIdentificationCard } from "react-icons/pi";
import img from "../images/defaultPic.webp";

export default function SelectedUserDpComponent(props){
    // console.log("connections", props.connections)
    return(
        <>
        <Container 
        fluid className="d-flex justify-content-center" 
        style={{
            backgroundColor:props.background, color:props.fontColor, 
            fontFamily:'sans-serif', borderBottom:"1px solid lightgrey"}}>
            <Row style={{gap:'15vw'}}>
                <Col>
                    <Row>
                        <Col style={{}}>
                            <Image 
                                src={(props.dp)?props.dp:img} 
                                roundedCircle 
                                style={{width: '10rem', padding:'0.5rem'}}
                            />
                        </Col>
                    </Row>
                    <p style={{fontWeight:'600'}}>{props.firstName} {props.lastName}</p>
                    {
                            props.userType==="Student"
                            ?(
                                <p>Student <PiStudentDuotone /></p> 
                            )
                            :(
                                <p>Employee <RiBuilding2Line /></p>
                            )
                    }
                </Col>
                <Col style={{   paddingTop:'10vh', paddingBottom:'2vh'}}>
                    {
                        (props.mobile)
                        ?(
                            <p><FaPhoneAlt/> {props.mobile}</p>
                        )
                        :(
                            <></>
                        )
                    }
                    <p style={{}}><PiIdentificationCard /> {props.email}</p>
                    {
                        (props.connections)
                        ?(
                            <p>Connections {props.connections.length}</p>
                        )
                        :(
                            <p>Connections 0</p>
                        )
                    }
                    {
                        (props.requests && props.requests.includes(props.currentUser))
                        ?(
                            <Button variant="primary" disabled={true}>Requested!</Button>
                        )
                        :(
                            (props.connections && props.connections.includes(props.currentUser))
                            ?(
                                <></>
                            )
                            :(
                                <Button variant="primary">Connect</Button>
                            )
                        )
                    }
                </Col>
            </Row>
        </Container>
    </>
    )
}
