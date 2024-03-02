import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Image, Card } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import { feedData } from "../data";
import PostComponent from "./postComponent";
import StartPostComponent from "./startPostComponent";
export default function FeedComponent() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className="mx-auto">
        <Card
          style={{
            marginTop: "2vh",
            marginBottom: "2vh",
            maxWidth: "800px",
            minWidth: "300px",
            width: "80vw",
          }}
        >
          <Card.Body style={{ display: "flex" }}>
            <Image
              src={img}
              roundedCircle
              style={{ width: "3rem", marginRight: "0.8rem" }}
            />
            <Button
              style={{
                textAlign: "left",
                backgroundColor: "transparent",
                borderColor: "#ccc",
                color: "#ccc",
                paddingLeft: "1.6rem",
                width: "90%",
              }}
              variant="secondary"
              size="lg"
              onClick={handleShow}
            >
              Share something...
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mx-auto" style={{ overflowY: "scroll" }}>
        {feedData
          .sort((a, b) => b.id - a.id)
          .map((post) => {
            return (
              <PostComponent
                key={post.id}
                post={post.post}
                postedBy={post.postedBy}
                id={post.id}
              />
            );
          })}
      </Container>
      <StartPostComponent
        data={feedData}
        show={show}
        handleInput={handleClose}
        handleClose={handleClose}
      />
    </>
  );
}
