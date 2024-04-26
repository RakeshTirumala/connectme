import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Form } from "react-bootstrap";

export default function PasswordChangeComponen(props){
    return(
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter new password" 
                    style={{background:props.background, color:props.fontColor}}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Confirm new password"
                    style={{background:props.background, color:props.fontColor}}
                    />
                </Form.Group>
            </Form>
            <div className="d-grid gap-2">
                    <Button variant="primary" size="lg">
                        Update
                    </Button>
            </div>
        </Container>
    )
}