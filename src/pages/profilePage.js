import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "../components/navbarComponent";
import { Container } from "react-bootstrap";

import ProfileDpComponent from "../components/profileDpComponent";
import PersonalInfoComponent from "../components/personalInfoComponent";
import EducationComponent from "../components/educationComponent";
import ProfessionalWorkComponent from "../components/professionalWorkComponent";
import ProjectsComponent from "../components/projectsComponent";
import InterestsComponent from "../components/interestsComponent";
import UserTypeComponent from "../components/userTypeComponent";

export default function ProfilePage() { 
  const [userType, setUserType] = useState("");
  const handleUserType=(childData)=>{
    setUserType(childData)
  }
  return (
    <>
      <NavbarComponent />
      <Container
        fluid
        className="mx-auto"
        style={{
          paddingTop: "3vh",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          overflowY: "scroll",
          height: "100vh",
          paddingBottom:'3vh'
        }}
      >
        <ProfileDpComponent userType={userType}/>
        <PersonalInfoComponent />
        <UserTypeComponent handleUserType={handleUserType}/>
        <EducationComponent />
        <ProfessionalWorkComponent />
        <ProjectsComponent/>  
        <InterestsComponent/>
      </Container>
    </>
  );
}
