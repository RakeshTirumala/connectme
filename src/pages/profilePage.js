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
    setNewUser(JSON.parse(localStorage.getItem('user')).newUser);
  }, []);
  
  console.log("new user", newUser);

  const setNewUserFunction=(data)=>{
    setNewUser(data)
  }
  // const handleSave=async()=>{
  //   const fn = localStorage.getItem('firstName')
  //   const ln = localStorage.getItem('lastName')
  //   const mobile = localStorage.getItem('mobile')
  //   const education = localStorage.getItem('Education')
  //   const experience = localStorage.getItem('workExperience')
  //   const projects = localStorage.getItem('projects')
  //   const interests = localStorage.getItem('interests')
  //   const email = localStorage.getItem('email')
  //   const userType = localStorage.getItem('userType')
  //   const dp = localStorage.getItem('dp')
    
  //   console.log("dp profile page", dp)
  //   // console.log(education.length)

  //   // const data = {fn:fn, ln:ln, mobile:mobile, education:education,
  //   //   experience:experience, projects:projects, interests:interests, email:email,newUser:false, userType:userType}
  //   // console.log(data)

  //   if(fn && ln && interests.length > 0){
  //     const response = await fetch(process.env.REACT_APP_PROFILE_URL_DIGITAL_OCEAN, {
  //       method:'PUT',
  //       headers: { "Content-Type": "application/json" },
  //       body:JSON.stringify({fn:fn, ln:ln, mobile:mobile, education:education,
  //       experience:experience, projects:projects, interests:interests, email:email,newUser:false, userType:userType, dp:dp})
  //     })
  //     if(response.ok){
  //       const data = await response.json();
  //       console.log("user", JSON.stringify(data.user))
  //       localStorage.setItem('newUser', data.user.newUser);
  //       setNewUser(data.user.newUser)
  //       localStorage.setItem('firstName', data.user.firstName);
  //       localStorage.setItem('lastName', data.user.lastName);
  //       localStorage.setItem('email', data.user.email);
  //       localStorage.setItem('mobile', data.user.mobile);
  //       localStorage.setItem('userType', data.user.userType);
  //       localStorage.setItem('dp', data.user.dp);
  //       // console.log("The education that I am going to insert", (JSON.stringify(responseData.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.Education))
        
  //       const education = (JSON.stringify(data.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Education)
  //       const experience = (JSON.stringify(data.user.WorkExperience)===undefined)?JSON.stringify([]):JSON.stringify(data.user.WorkExperience)
  //       const projects = (JSON.stringify(data.user.Projects)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Projects)
  //       const interests = (JSON.stringify(data.user.Interests)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Interests)
  //       localStorage.setItem('Education', education);
  //       localStorage.setItem('workExperience', experience);
  //       localStorage.setItem('projects', projects)
  //       localStorage.setItem('interests', interests);
  //       // if(!newUser) window.location.reload()
  //     }else{
  //       console.log("User error")
  //     }
  //   }else{
  //     alert("Please make sure you fill all the details correctly!!!")
  //   }
  // }

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
