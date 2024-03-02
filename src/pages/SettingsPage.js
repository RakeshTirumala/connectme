import React, { useState } from "react";
import NavbarComponent from "../components/navbarComponent";
import { Accordion, Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { IoLogOut } from "react-icons/io5";
import HelpComponent from "../components/helpComponent";
import PasswordChangeComponen from "../components/passwordChangeComponent";

export default function SettingsPage(props) {
  const [darkTheme, setDarkTheme] = useState(false);
  const onTrigger = () => {
    setDarkTheme(!darkTheme);
    props.bgTheme(darkTheme);
  };
  return (
    <>
      <NavbarComponent />
      <Container fluid className="mx-auto" style={{ marginTop: "2vh" }}>
        <Container fluid className="mx-auto" style={{ paddingLeft: "5%" }}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Help</Accordion.Header>
              <Accordion.Body>
                <HelpComponent />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Change Password</Accordion.Header>
              <Accordion.Body>
                <PasswordChangeComponen />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <ListGroup style={{ marginTop: "5vh" }}>
            <ListGroup.Item
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Dark Theme{" "}
              <BootstrapSwitchButton
                checked={darkTheme}
                size="sm"
                onChange={onTrigger}
              />
            </ListGroup.Item>
            <ListGroup.Item style={{ cursor: "pointer" }}>
              Logout <IoLogOut />
            </ListGroup.Item>
          </ListGroup>
        </Container>
        {/* 
                <Container style={{marginTop:'5vh'}}>
                    <ListGroup>
                        <ListGroup.Item 
                        style={{display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                        }}>Dark Theme <BootstrapSwitchButton checked={false} size="sm"/></ListGroup.Item>
                        <ListGroup.Item style={{cursor:'pointer'}}>Logout <IoLogOut /></ListGroup.Item>
                    </ListGroup>
                </Container> */}
      </Container>
    </>
  );
}
