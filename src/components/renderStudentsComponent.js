import React, { useState } from "react";
import { data } from "../data";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";

export default function RenderStudentComponent(props) {
  const [requestedMap, setRequestedMap] = useState({});

  const studentData = data.filter((dp) => {
    if (!props.searchQuery) return dp.professional === false;
    return (
      dp.professional === false &&
      (dp.firstName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        dp.lastName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        dp.bio.toLowerCase().includes(props.searchQuery.toLowerCase()))
    );
  });

  const handleConnect = (email) => {
    setRequestedMap((prevMap) => ({
      ...prevMap,
      [email]: true,
    }));
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {studentData.map((item) => (
        <Col key={item.email}>
          <Card style={{ width: "18rem" }}>
            <Image
              src={img}
              style={{ width: "8rem", padding: "0.5rem" }}
              roundedCircle
            />
            <Card.Body>
              <Card.Title>
                {item.firstName} {item.lastName}
              </Card.Title>
              <Card.Text>{item.bio}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleConnect(item.email)}
              >
                {requestedMap[item.email] ? "Requested!" : "Connect"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
