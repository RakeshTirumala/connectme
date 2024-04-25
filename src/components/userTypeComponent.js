import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Form } from "react-bootstrap";
import { PiIdentificationBadgeLight } from "react-icons/pi";

export default function UserTypeComponent(props){
    const type = localStorage.getItem('userType');
    const [userType, setUserType] = useState(type);

    useEffect(() => {
        props.handleUserType(userType);
    }, [userType, props]);

    const handleType=(e)=>{
        setUserType(e.target.value);
        localStorage.setItem('userType', e.target.value);
        props.handleUserType(e.target.value)
    };

    return(
        <Container fluid className="mx-auto">
            <label
            style={{
            marginLeft: "3vw",
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "2vh",
            backgroundColor:props.background, color:props.fontColor
            }}>I am  <PiIdentificationBadgeLight />
            </label>
            <Container fluid className="mx-auto">
                <Container fluid className="mx-auto">
                    <Form style={{marginLeft:'3vw', backgroundColor:props.background, color:props.fontColor}}>
                        <Form.Check 
                        type="radio"
                        id="1"
                        name="userType"
                        value="Student"
                        label="Student"
                        onChange={handleType}
                        checked={userType==="Student"}
                        />
                        <Form.Check 
                        type="radio"
                        id="2"
                        name="userType"
                        label="Employee"
                        value="Employee"
                        checked={userType==="Employee"}
                        onChange={handleType}
                        />
                    </Form>
                </Container>
            </Container>
        </Container>
    )
}
