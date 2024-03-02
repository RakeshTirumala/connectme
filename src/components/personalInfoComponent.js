import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { SlInfo } from "react-icons/sl";
import { currentUser } from "../data";
import { TiTick } from "react-icons/ti";

export default function PersonalInfoComponent() {

  const [booleanForFirstName, setBooleanForFirstName] = useState(true)
  const [booleanForLastName, setBooleanForLastName] = useState(true)
  const [booleanForEmail, setBooleanForEmail] = useState(true)
  const [booleanForMobile, setBooleanForMobile] = useState(true)
  const [firstName, setFirstName] = useState("Rakesh")
  const [lastName, setLastName] = useState("Tirumala")
  const [email, setEmail] = useState("rakeshus2002@gmail.com")
  const[mobile, setMobile] = useState("848-342-8163")
  
  return (
    <Container fluid className="mx-auto" style={{ marginTop: "3vh" }}>
      <label
        style={{
          marginLeft: "3vw",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "2vh",
        }}
      >
        Personal Information <SlInfo />
      </label>

      <Container className="d-flex justify-content-center">
        <Row>
          {/* First Name */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="First name"
              aria-label="First name"
              aria-describedby="basic-addon2"
              value={firstName}
              disabled={booleanForFirstName}
              style={{ boxShadow: "none" }}
              onChange={(e)=>setFirstName(e.target.value)}
            />
            {
              booleanForFirstName
              ?(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForFirstName(false)}
                >
                  <FiEdit2 />
                </Button>
              )
              :(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForFirstName(true)}
                >
                  <TiTick/>
                </Button>
              )
            }
          </InputGroup>
          {/* Last Name */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Last name"
              aria-label="Last name"
              aria-describedby="basic-addon2"
              value={lastName}
              disabled={booleanForLastName}
              style={{ boxShadow: "none" }}
              onChange={(e)=>setLastName(e.target.value)}
            />
            {
              booleanForLastName
              ?(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForLastName(false)}
                >
                  <FiEdit2 />
                </Button>
              )
              :(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForLastName(true)}
                >
                  <TiTick/>
                </Button>
              )
            }
          </InputGroup>
          {/* Email */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email address"
              aria-label="Email address"
              aria-describedby="basic-addon2"
              disabled={booleanForEmail}
              value={email}
              style={{ boxShadow: "none" }}
              onChange={(e)=>setEmail(e.target.value)}
            />
            {
              booleanForEmail
              ?(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForEmail(false)}
                >
                  <FiEdit2 />
                </Button>
              )
              :(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForEmail(true)}
                >
                  <TiTick/>
                </Button>
              )
            }
          </InputGroup>
          {/* Phone */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Phone"
              aria-label="Phone"
              aria-describedby="basic-addon2"
              disabled={booleanForMobile}
              value={mobile}
              style={{ boxShadow: "none" }}
              onChange={(e)=>setMobile(e.target.value)}
            />
            {
              booleanForMobile
              ?(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForMobile(false)}
                >
                  <FiEdit2 />
                </Button>
              )
              :(
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={()=>setBooleanForMobile(true)}
                >
                  <TiTick/>
                </Button>
              )
            }
          </InputGroup>
        </Row>
      </Container>
    </Container>
  );
}
