import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "../components/navbarComponent";
import { Alert, Button, Container } from "react-bootstrap";

import ProfileDpComponent from "../components/profileDpComponent";
import PersonalInfoComponent from "../components/personalInfoComponent";
import EducationComponent from "../components/educationComponent";
import ProfessionalWorkComponent from "../components/professionalWorkComponent";
import ProjectsComponent from "../components/projectsComponent";
import InterestsComponent from "../components/interestsComponent";
import UserTypeComponent from "../components/userTypeComponent";
import UserActivityComponent from "../components/userActivityComponent";
 
export default function ProfilePage(props) { 
  const [userType, setUserType] = useState("");
  const [newUser, setNewUser] = useState(true)
  const handleUserType=(childData)=>{
    setUserType(childData)
  }
  useEffect(() => {
    setNewUser(JSON.parse(localStorage.getItem('newUser')));
  }, []);
  
  console.log("new user", newUser);

  const setNewUserFunction=(data)=>{
    setNewUser(data)
  }

  return (
    <>
    {
      (newUser)
      ?(
        <></>
      )
      :(
        <NavbarComponent background={props.background} fontColor={props.fontColor} themeData={props.themeData}/>
      )
    }
    {/* <NavbarComponent/> */}
      <Container
        fluid
        className="mx-auto"
        style={{
          paddingTop: "3vh",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          overflowY: "scroll",
          height: "100vh",
          paddingBottom:'3vh',
          backgroundColor:props.background,
          minHeight:'100vh'
        }}
      >
        <ProfileDpComponent 
        userType={userType} setNewUserFunction={setNewUserFunction} 
        background={props.background} fontColor={props.fontColor}/>
        <PersonalInfoComponent background={props.background} fontColor={props.fontColor}/>
        <UserTypeComponent handleUserType={handleUserType} background={props.background} fontColor={props.fontColor}/>
        <EducationComponent background={props.background} fontColor={props.fontColor} />
        <ProfessionalWorkComponent background={props.background} fontColor={props.fontColor}/>
        <ProjectsComponent background={props.background} fontColor={props.fontColor}/>  
        <InterestsComponent background={props.background} fontColor={props.fontColor}/>
        <UserActivityComponent background={props.background} fontColor={props.fontColor}/>
      </Container>
    </>
  );
}
