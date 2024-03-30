import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row } from "react-bootstrap";

export default function SubEducationComponent(props){

    const dateFormatter=(dateString)=>{
        const date = new Date(JSON.parse(dateString));
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate
    }
    return(
        <Container className="mx-auto">
            <Row>
                <p>
                    <strong>School:</strong> {props.school}
                    <br/>
                    <strong>Period:</strong> {dateFormatter(props.start)} to {dateFormatter(props.end)}
                    <br/>
                    <strong>Concentration:</strong> {props.conc}
                </p>
            </Row>
        </Container>
    )
}
