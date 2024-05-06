import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ButtonGroup, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import finished from '../images/finished.svg'
import { useNavigate } from "react-router-dom";

export default function RequestsComponent(props){
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        props.handleRequestsLength(requests.length);
    }, [requests]);

    const fetchRequests = async () => {
        const response = await fetch(`${process.env.REACT_APP_NETWORK_URL_DIGITAL_OCEAN}/requests?email=${props.email}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });

        if (response.ok) {
            const data = await response.json();
            setRequests(data.requests.map(request => ({
                ...request,
                decision: false // Add a decision property to each request
            })));
            localStorage.setItem('requests', JSON.stringify(data.requests));
        } else {
            console.log("Couldn't fetch requests");
        }
    }

    const handleRequest = async (value, actionOnUser) => {
        const response = await fetch(`${process.env.REACT_APP_NETWORK_URL_DIGITAL_OCEAN}/connectionRequest`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            credentials:'include',
            body: JSON.stringify({decision: value, currentUser: props.email, actionOnUser: actionOnUser})
        });
        
        if (response.ok) {
            setRequests(prevRequests => prevRequests.map(request => {
                if (request.email === actionOnUser) {
                    return { ...request, decision: true };
                }
                return request;
            }));
        } else {
            console.log(response.status);
        }
    }

    const handleProfileRoute=(email)=>{
        navigate('/user', {state:{email:email}})
      }

    return (
        <Container fluid className="mx-auto" style={{minHeight:'60vh'}}>
            {
                (!requests || requests.length === 0)
                ? (
                    <center>
                        <Image src={finished} style={{ width: '12rem', margin:'10%'}} />
                    </center>
                )
                : (
                    <ListGroup>
                        {requests.map((request) => (
                            <ListGroup.Item 
                            key={request.email} 
                            onClick={()=>handleProfileRoute(request.email)}
                            style={{ backgroundColor: props.background, color: props.fontColor, cursor:'pointer'}}>
                                <Row>
                                    <Col>
                                        <Image src={(!request.dp) ? img : request.dp} roundedCircle style={{width:'2.5rem'}}/>
                                    </Col>
                                    <Col style={{padding:'0.5%'}}>
                                        {request.firstName} {request.lastName} 
                                    </Col>
                                    <Col style={{padding:'0.5%'}}>
                                        {
                                            (!request.decision)
                                            ? (
                                                <ButtonGroup size="sm" style={{gap:'1.5%'}}>
                                                    <Button variant="primary" onClick={() => handleRequest("Accept", request.email)}>Accept</Button>
                                                    <Button variant="danger" onClick={() => handleRequest("Reject", request.email)}>Reject</Button>
                                                </ButtonGroup>
                                            )
                                            : (
                                                <Button variant="outline-secondary" disabled size="sm">Decision Selected!</Button>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
            }
        </Container>
    );
}
