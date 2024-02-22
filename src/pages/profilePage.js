import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from "../components/navbarComponent";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import ProfileDpComponent from "../components/profileDpComponent";
import PersonalInfoComponent from "../components/personalInfoComponent";
import EducationComponent from "../components/educationComponent";
import ProfessionalWorkComponent from "../components/professionalWorkComponent";

export default function ProfilePage(){
    return(
        <>
            <NavbarComponent/>
            <Container fluid className="mx-auto" 
            style={{
                paddingTop:'3vh', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                overflowY:'scroll',
                height:'100vh'
                }}>
                    <ProfileDpComponent/>
                    <PersonalInfoComponent/>
                    <EducationComponent/>
                    <ProfessionalWorkComponent/>
            </Container>
        </>
    )
}
