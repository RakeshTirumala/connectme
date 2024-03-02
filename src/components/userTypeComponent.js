import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Form } from "react-bootstrap";
import { PiIdentificationBadgeLight } from "react-icons/pi";

export default function UserTypeComponent(props){
    const handleType=(e)=>{
        props.handleUserType(e.target.value)
    }
    return(
        <Container fluid className="mx-auto">
            <label
            style={{
            marginLeft: "3vw",
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "2vh",
            }}>I am a <PiIdentificationBadgeLight />
            </label>
            <Container fluid className="mx-auto">
                <Container fluid className="mx-auto">
                    <Form style={{marginLeft:'3vw'}}>
                        <Form.Check 
                        type="radio"
                        id="1"
                        name="userType"
                        value="Student"
                        label="Student"
                        onChange={handleType}
                        />
                        <Form.Check 
                        type="radio"
                        id="2"
                        name="userType"
                        label="Employee"
                        value="Employee"
                        onChange={handleType}
                        />
                    </Form>
                </Container>
            </Container>
        </Container>
    )
}