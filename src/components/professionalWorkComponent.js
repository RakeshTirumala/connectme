import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Accordion, Container } from "react-bootstrap";
import { MdOutlineWorkOutline } from "react-icons/md";
import { currentUser } from "../data";
import SubProfessionalWork from "./subProfessionWork";

export default function ProfessionalWorkComponent(){
    return(
        <Container fluid className="mx-auto" style={{marginTop:'3vh'}}>
        <label style={{marginLeft:'3vw', fontWeight:'bold', fontSize:'16px',  marginBottom:'2vh'}}>Professional work <MdOutlineWorkOutline/></label>
        <Container fluid className="mx-auto">
            <Container fluid className="mx-auto">
                <Accordion defaultActiveKey="0">
                    {
                        currentUser.WorkExperience.map((work)=>{
                            return(
                                <Accordion.Item eventKey={`${work.startDate} ${work.endDate}`}>
                                    <Accordion.Header>{work.role}</Accordion.Header>
                                    <Accordion.Body>
                                        <SubProfessionalWork 
                                        start={work.startDate} 
                                        end={work.endDate} 
                                        company={work.company}
                                        description={work.description}
                                        />
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