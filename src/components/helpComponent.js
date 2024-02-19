import React from "react";
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';

export default function HelpComponent(){
    return(
        <Form>
            <Container>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Issue subject" style={{boxShadow:'none'}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} style={{boxShadow:'none'}}/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg">
                        Submit
                    </Button>
                </div>
            </Container>
        </Form>
    )    
} 