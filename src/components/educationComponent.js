import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Container } from "react-bootstrap";
import { IoSchoolOutline } from "react-icons/io5";
import { currentUser } from "../data";
import SubEducationComponent from "./subEducationComponent";

export default function EducationComponent(){
    return(
        <Container fluid className="mx-auto" style={{marginTop:'3vh'}}>
            <label style={{marginLeft:'3vw', fontWeight:'bold', fontSize:'16px',  marginBottom:'2vh'}}>Education <IoSchoolOutline/></label>
            <Container fluid className="mx-auto">
                <Container fluid className="mx-auto">
                    <Accordion defaultActiveKey="0">
                        {
                            currentUser.Education.map((edu)=>{
                                return(
                                    <Accordion.Item eventKey={`${edu.startDate} ${edu.endDate}`}>
                                        <Accordion.Header>{edu.DegreeLevel}</Accordion.Header>
                                        <Accordion.Body>
                                            <SubEducationComponent 
                                            school={edu.schoolName} 
                                            start={edu.startDate}
                                            end={edu.endDate}
                                            conc={edu.Concentration}/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })
                        }
                    </Accordion>
                </Container>
            </Container>
        </Container>
    )
}