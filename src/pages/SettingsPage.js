import React, { useState } from "react";
import NavbarComponent from "../components/navbarComponent";
import { Container, ListGroup, Tab, Tabs } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { IoLogOut } from "react-icons/io5";
import HelpComponent from "../components/helpComponent";
import PasswordChangeComponen from "../components/passwordChangeComponent";

export default function SettingsPage(){
    const [key, setKey] = useState("help")
    return(
        <>
            <NavbarComponent/>
            <Container fluid className="mx-auto" style={{ marginTop: '2vh' }}>
                <Container fluid className="mx-auto" style={{paddingLeft:'5%'}}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3">
                            <Tab eventKey="help" title="Help">
                                <HelpComponent/>
                            </Tab>
                            <Tab eventKey="changePassword" title="Change Password">
                                <PasswordChangeComponen/>
                            </Tab>
                        </Tabs>
                </Container>
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
                </Container>
            </Container>
        </>
    )
}