import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row } from "react-bootstrap";

export default function SubProfessionalWork(props){
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
                <strong>Company:</strong> {props.company}
                <br/>
                <strong>Period:</strong> {dateFormatter(props.start)} to {dateFormatter(props.end)}
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