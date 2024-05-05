import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Accordion, Card, Container, Row } from "react-bootstrap";
import { IoSchoolOutline } from "react-icons/io5";
import SubEducationComponent from "./subEducationComponent";

export default function SelectedUserEducation(props){
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
        <Container fluid className="mx-auto" 
        style={{color:props.fontColor, backgroundColor:props.background}}>
            <label
                style={{
                marginLeft: "3vw",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "2vh",
                marginTop:'3vh'
                }}
            >
            Education <IoSchoolOutline/>
            </label>
            <Container fluid className="mx-auto">
                <Container fluid className="mx-auto">
                        {
                            props.education.map((edu, index) => {
                                return (
                                    <Card key={index} style={{
                                        backgroundColor:props.background, 
                                        color:props.fontColor, margin:'0.5rem'}}>
                                    <Card.Header 
                                    style={{
                                        fontSize:'14px', borderStyle:'none', 
                                        background:props.background}}><strong>{edu.Degree}</strong></Card.Header>
                                    <Card.Body>
                                    <Container className="mx-auto">
                                        <Row>
                                            <p>
                                                <strong>School:</strong> {edu.schoolName}
                                                <br/>
                                                <strong>Concentration:</strong>{edu.Concentration}
                                                <strong>Period:</strong> {dateFormatter(edu.startDate)} to {dateFormatter(edu.endDate)}
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
