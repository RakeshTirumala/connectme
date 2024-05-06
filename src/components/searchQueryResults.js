import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import img from '../images/defaultPic.webp';
import { useNavigate } from "react-router-dom";
 
export default function SearchQueryResults(props){
    const [requested, setRequested] = useState(new Set());
    const navigate = useNavigate();
    
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
                body:JSON.stringify({currentUser:props.currentUser, targetUser:email}),
                credentials:'include',
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
    const handleProfileRoute=(email)=>{
        navigate('/user', {state:{email:email}})
    }

    return(
        <Container fluid className="mx-auto" style={{overflowY:'scroll'}}>
            <Row xs={1} md={2} lg={3} className="g-4">
                {
                    props.searchResult.map((item) => (
                        <Col key={item.email}>
                            <Card 
                            style={{ width: '18rem', 
                                backgroundColor:props.background, 
                                color:props.fontColor,
                                borderColor:'lightgrey',
                                cursor:'pointer'
                                }}
                            onClick={()=>handleProfileRoute(item.email)}    
                            >
                                <Image src={(!item.dp)?img:item.dp} style={{ width: '8rem', padding: '0.5rem' }} roundedCircle />
                                <Card.Body>
                                    <Card.Title>{item.firstName} {item.lastName}</Card.Title>
                                    {
                                        (requested.has(item.email))
                                        ?(
                                            <Button variant="primary" disabled={true}>Requested!</Button>
                                        )
                                        :(
                                            <Button variant="primary" onClick={()=>handleConnect(item.email)}>
                                            Connect
                                            </Button>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}