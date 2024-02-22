import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row } from "react-bootstrap";

export default function SubEducationComponent(props){
    return(
        <Container className="mx-auto">
            <Row>
                <p>
                    <strong>School:</strong> {props.school}
                    <br/>
                    <strong>Period:</strong> {props.start} to {props.end}
                    <br/>
                    <strong>Concentration:</strong> {props.conc}
                </p>
            </Row>
        </Container>
    )
}
