import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { GrProjects } from "react-icons/gr";
import { Card, Container } from "react-bootstrap";


export default function SelectedUserProjects(props){
    return(
        <Container fluid className="mx-auto" style={{color:props.fontColor}}>
            <label
                style={{
                marginLeft: "3vw",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "2vh",
                }}>
                Projects <GrProjects/>
            </label>
            <Container fluid className="mx-auto">
                <Container fluid className="mx-auto">
                    {
                        props.projects.map((project, index) => {
                            return (
                                <Card 
                                key={index} 
                                style={{backgroundColor:props.background, color:props.fontColor, margin:'0.5rem',
                                fontFamily:'sans-serif'}}>
                                    <Card.Header
                                        style={{
                                            fontSize:'14px', borderStyle:'none', 
                                            background:props.background}}>
                                        <strong>{project.projectTitle}</strong>
                                    </Card.Header>
                                    <Card.Body>
                                        {project.description}
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