import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';

export default function HelpComponent(props){
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const currentUser = localStorage.getItem("email");

    const sendHelp=async()=>{
        const response = await fetch(`${process.env.REACT_APP_USER_URL_DIGITAL_OCEAN}/help`, {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify({currentUser:currentUser, subject:subject, content:content})
        })
        if(response.ok){
            console.log("Success!!")
        }
    }

    return(
        <Form>
            <Container>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Subject</Form.Label>
                <Form.Control 
                type="text" 
                onChange={(e)=>setSubject(e.target.value)}
                placeholder="Issue subject" 
                style={{boxShadow:'none', background:props.background, color:props.fontColor}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3} 
                    onChange={(e)=>setContent(e.target.value)}
                    style={{boxShadow:'none', background:props.background, color:props.fontColor}}/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={()=>sendHelp()}>
                        Submit
                    </Button>
                </div>
            </Container>
        </Form>
    )    
} 