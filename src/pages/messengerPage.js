import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from "../components/navbarComponent";
import { IoIosArrowForward } from "react-icons/io";
import '../styles/messenger.css';
import { Form, InputGroup, ListGroup, Offcanvas } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { currentUser } from "../data";
import MessengerAccountsComponent from "../components/messengerAccountsComponent";
import StartConversationComponent from "../components/startConversationComponent";

export default function MessengerPage(){
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    return(
        <>
            <NavbarComponent/>
            {
                isVisible && (
                    <div className="icon-container">
                        <IoIosArrowForward className="arrowButton" style={{fontSize:'30px'}} onClick={()=>{
                            setShow(true)
                            setIsVisible(false)
                            }}/>
                    </div>
                )
            }
            <Offcanvas show={show} onHide={()=>{
                setShow(false)
                setIsVisible(true)
                }}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Connections</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" style={{cursor:'pointer'}}><IoSearch /></InputGroup.Text>
                        <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{boxShadow:'none'}}
                        />
                    </InputGroup>
                    <ListGroup as="ol" style={{overflowY:'scroll'}}> 
                        {
                            currentUser.Connections.map((connection)=>{
                                return(
                                    <MessengerAccountsComponent connectionName={connection.firstName + " " +connection.lastName}/>
                                )
                            })
                        }
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
            <StartConversationComponent/>
        </>
    )
}
