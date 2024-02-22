import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row } from "react-bootstrap";

export default function SubProfessionalWork(props){
    return(
        <Container className="mx-auto">
        <Row>
            <p>
                <strong>Company:</strong> {props.company}
                <br/>
                <strong>Period:</strong> {props.start} to {props.end}
            </p>
        </Row>
        <Row>
            <p style={{textAlign:'justify'}}>
                <strong>Description</strong>
                <br/>
                {props.description}
            </p>
        </Row>
    </Container>
    )
}