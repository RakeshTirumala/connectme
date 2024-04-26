import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import img from '../images/defaultPic.webp';

export default function SearchQueryResults(props){
    const [requested, setRequested] = useState(new Set());
    
    useEffect(()=>{
        if(props.searchResult){
            props.searchResult.forEach((user)=>{
                if(new Set(user.Requests).has(props.currentUser)){
                    const newSet = new Set(requested);
                    newSet.add(user.email);
                    setRequested(newSet);
                }
            })
        }
    },[])

    const handleConnect=async(email)=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_NETWORK_URL_DIGITAL_OCEAN}/requests`,{
                method:'PUT',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({currentUser:props.currentUser, targetUser:email})
              })
              if(response.ok){
                let past = new Set(requested);
                past.add(email)
                setRequested(past)
              }
        }catch(error){
            alert(error)
        }
    }

    return(
        <Container fluid className="mx-auto" style={{overflowY:'scroll'}}>
            <Row xs={1} md={2} lg={3} className="g-4">
                {
                    props.searchResult.map((item) => (
                        <Col key={item.email}>
                            <Card style={{ width: '18rem', 
                                backgroundColor:props.background, 
                                color:props.fontColor,
                                borderColor:'lightgrey'
                                }}>
                                <Image src={(!item.dp)?img:item.dp} style={{ width: '8rem', padding: '0.5rem' }} roundedCircle />
                                <Card.Body>
                                    <Card.Title>{item.firstName} {item.lastName}</Card.Title>
                                    <Button variant="primary" onClick={()=>handleConnect(item.email)}>
                                        {requested.has(item.email) ? 'Requested!' : 'Connect'}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}