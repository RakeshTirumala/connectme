import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function StartPostComponent(props) {
  const [post, setPost] = useState("");
  const handlePost = () => {
    props.data.push({
      id: props.data.length + 1,
      post: post,
      postedBy: "Gilfoyle",
    });
    props.handleClose();
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="feedtext">
            <Form.Control
              as="textarea"
              value={post}
              placeholder="Start a post"
              rows={3}
              onChange={(e) => setPost(e.target.value)}
              style={{ boxShadow: "none" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePost}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
