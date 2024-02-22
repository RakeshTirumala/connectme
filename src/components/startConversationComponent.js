import React from "react";
import { Container, Row } from "react-bootstrap";
import { GiConversation } from "react-icons/gi";
import { primaryColor } from "../constants";
import { BiMessageSquare } from "react-icons/bi"

export default function StartConversationComponent() {
    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                height: '100vh', 
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Row>
                    <BiMessageSquare style={{ fontSize: '10rem', color: 'lightgrey'}} />
                    <p style={{ fontSize: '1.5rem', color:'grey'}}>Start a conversation!</p>
                </Row>
            </div>
        </Container>
    );
}
