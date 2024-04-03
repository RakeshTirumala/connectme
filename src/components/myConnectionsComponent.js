import React, { useState } from "react";
import { data } from "../data";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import { Link } from "react-router-dom";

export default function MyConnectionsComponent(props) {
  console.log("here" + props.connections);
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

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {userData.map((item) => (
        <Col key={item.email}>
          <Card style={{ width: "18rem" }}>
            <Image
              src={img}
              style={{ width: "8rem", padding: "0.5rem" }}
              roundedCircle
            />
            <Card.Body>
              <Card.Title>test</Card.Title>
              <Card.Text>test</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleConnect(item.email)}
              >
                <Link to={"/messenger"} style={{ color: "black" }}>
                  Message
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
