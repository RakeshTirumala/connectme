import React, { useState } from "react";
import { data } from "../data";
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import { Link, useNavigate } from "react-router-dom";
import noDataa from '../images/noDataa.svg'
import { GrCursor } from "react-icons/gr";

export default function MyConnectionsComponent(props) {
  console.log("here", props.connections);
  const userData = props.connections;
  const navigate = useNavigate();


  /* const userData = props.userData.connections.filter((conn) => {
    if (!props.searchQuery) return true;
    return (
      conn.firstName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      conn.lastName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      conn.bio.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
  });*/
  const handleProfileRoute=(email)=>{
    navigate('/user', {state:{email:email}})
  }

  let i = 0;
  return (
    <>
      <Container fluid className="mx-auto" style={{minHeight:'60vh'}}>
        {
          (userData.length!==0)
          ?(
            <ListGroup>
              {
                userData.map((user)=>{
                  return(
                    <ListGroup.Item 
                    key={user.email} 
                    style={{ 
                      backgroundColor:props.background, color:props.fontColor,
                      cursor:'pointer'
                    }}
                    onClick={()=>handleProfileRoute(user.email)}
                    >
                      <Row>
                        <Col sm={4} md={2} >
                          <Image src={(!user.dp)?img:user.dp} roundedCircle style={{width:'2.5rem'}}/>
                        </Col>
                        <Col style={{padding:'0.5%'}} sm={4} md={2} >
                          {user.firstName} {user.lastName}
                        </Col>
                        <Col style={{padding:'0.5%'}} sm={4} md={2} >
                          {user.email}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          )
          :(
            <center>
              <Image src={noDataa} style={{ width: '12rem', margin:'10%'}} />
            </center>
          )
        }
      </Container>
    </>
  );
}
