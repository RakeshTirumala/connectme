import React, { useState } from "react";
import { data } from "../data";
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import { Link } from "react-router-dom";
import noDataa from '../images/noDataa.svg'

export default function MyConnectionsComponent(props) {
  console.log("here", props.connections);
  const userData = props.connections;

  /* const userData = props.userData.connections.filter((conn) => {
    if (!props.searchQuery) return true;
    return (
      conn.firstName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      conn.lastName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      conn.bio.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
  });*/

  const handleConnect = (email) => {};
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
                    <ListGroup.Item key={user}>
                      <Row>
                        <Col sm={3} md={2}>
                          <Image src={img} roundedCircle style={{width:'2.5rem'}}/>
                        </Col>
                        <Col style={{padding:'0.5%'}}>
                          {user}
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
