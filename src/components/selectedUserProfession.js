import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Accordion, Card, Container, Row } from "react-bootstrap";
import { MdOutlineWorkOutline } from "react-icons/md";
import SubProfessionalWork from "./subProfessionWork";


export default function SelectedUserProfession(props){
    const dateFormatter = (dateString) => {
        const date = new Date(JSON.parse(dateString));
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    };
    
    
    return(
        <Container fluid className="mx-auto" style={{color:props.fontColor, backgroundColor:props.background}}>
            <label
            style={{
            marginLeft: "3vw",
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "2vh",
            marginTop:'3vh'
            }}
        >
            Professional work <MdOutlineWorkOutline />
        </label>
        <Container fluid className="mx-auto">
            <Container fluid className="mx-auto">
                {
                    props.professional.map((work, index) => {
                        return (
                            <Card key={index} style={{margin:'0.5rem',backgroundColor:props.background, color:props.fontColor}}>
                                <Card.Header 
                                style={{
                                    fontSize:'14px', borderStyle:'none', 
                                    background:props.background}}><strong>{work.role}</strong></Card.Header>
                                <Card.Body>
                                <Container className="mx-auto">
                                    <Row>
                                        <p>
                                            <strong>Company:</strong> {work.company}
                                            <br/>
                                            <strong>Period:</strong> {dateFormatter(work.startDate)} to {dateFormatter(work.endDate)}
                                        </p>
                                    </Row>
                                    <Row>
                                        <p style={{textAlign:'justify'}}>
                                            <strong>Description</strong>
                                            <br/>
                                            {work.description}
                                        </p>
                                    </Row>
                                </Container>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </Container>
        </Container>
        </Container>
    )
}