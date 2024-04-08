import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ButtonGroup, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import finished from '../images/finished.svg'

export default function RequestsComponent(props){
    const [requests, setRequests] = useState([])
    const [decision, setDecision] = useState(false)

    useEffect(()=>{
        fetchRequests()
    },[])

    props.handleRequestsLength(requests.length)


    const fetchRequests=async()=>{
        const response = await fetch(`http://localhost:1111/api/network/requests?email=${props.email}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })

        console.log("Requests` response", response)

        if(response.ok){
            const data = await response.json();
            console.log(data)
            setRequests(data.requests);
            localStorage.setItem('requests', JSON.stringify(data.requests))
            console.log("[requests]",data.requests)
        }else{
            console.log("couldn't fetch requests")
        }
    }

    // console.log("Requests", requests)
  
    const handleRequest=async(value, actionOnUser)=>{
        // console.log(value, actionOnUser, props.email)
        const response = await fetch(`http://localhost:1111/api/network/connectionRequest`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({decision:value, currentUser:props.email, actionOnUser:actionOnUser})
        })
        console.log(response)
        if(response.ok){
            setDecision(true)
        }else{
            console.log(response.status)
        }
    }

    return(
        <>
            <Container fluid className="mx-auto" style={{minHeight:'60vh'}}>
                {
                    (!requests || requests.length===0)
                    ?(
                        <center>
                            <Image src={finished} style={{ width: '12rem', margin:'10%'}} />
                        </center>
                    )
                    :(
                        <>
                            <ListGroup>
                                {
                                    requests.map((request)=>{
                                        return(
                                            <ListGroup.Item  key={request.email}>
                                                <Row>
                                                    <Col>
                                                        <Image src={img} roundedCircle style={{width:'2.5rem'}}/>
                                                    </Col>
                                                    <Col style={{padding:'0.5%'}}>
                                                        {request.firstName} {request.lastName} 
                                                    </Col>
                                                    <Col style={{padding:'0.5%'}}>
                                                        {
                                                            (!decision)
                                                            ?(
                                                                <ButtonGroup size="sm" style={{gap:'1.5%'}}>
                                                                    <Button 
                                                                    variant="primary" 
                                                                    onClick={()=>handleRequest("Accept", request.email)}>Accept</Button>
                                                                    <Button 
                                                                    variant="danger"
                                                                    onClick={()=>handleRequest("Reject", request.email)}>Reject</Button>
                                                                </ButtonGroup>
                                                            )
                                                            :(
                                                                <Button 
                                                                variant="outline-secondary" 
                                                                disabled={true}
                                                                size="sm"
                                                                >Decision Selected!</Button>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </>
                    )
                }
            </Container>
        </>
    )
}