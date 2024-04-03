import React, { useState } from "react";
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
 
export default function ProfilePage() { 
  const [userType, setUserType] = useState("");
  const handleUserType=(childData)=>{
    setUserType(childData)
  }
  let newUser = localStorage.getItem('user');
  newUser = JSON.parse(newUser).newUser;
  console.log("new user", newUser);

  const handleSave=async()=>{
    const fn = localStorage.getItem('firstName')
    const ln = localStorage.getItem('lastName')
    const mobile = localStorage.getItem('mobile')
    const education = localStorage.getItem('Education')
    const experience = localStorage.getItem('workExperience')
    const projects = localStorage.getItem('projects')
    const interests = localStorage.getItem('interests')
    const email = localStorage.getItem('email')
    const userType = localStorage.getItem('userType')
    console.log(education.length)

    // const data = {fn:fn, ln:ln, mobile:mobile, education:education,
    //   experience:experience, projects:projects, interests:interests, email:email,newUser:false, userType:userType}
    // console.log(data)

    if(fn && ln && mobile.length === 10 && interests.length > 0){
      const response = await fetch('http://localhost:1111/api/profile/', {
        method:'PUT',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({fn:fn, ln:ln, mobile:mobile, education:education,
        experience:experience, projects:projects, interests:interests, email:email,newUser:false, userType:userType})
      })
      if(response.ok){
        const data = await response.json();
        console.log("user", JSON.stringify(data.user))
        localStorage.setItem('newUser', data.user.newUser);
        localStorage.setItem('firstName', data.user.firstName);
        localStorage.setItem('lastName', data.user.lastName);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('mobile', data.user.mobile);
        localStorage.setItem('userType', data.user.userType);
        // console.log("The education that I am going to insert", (JSON.stringify(responseData.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.Education))
        
        const education = (JSON.stringify(data.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Education)
        const experience = (JSON.stringify(data.user.WorkExperience)===undefined)?JSON.stringify([]):JSON.stringify(data.user.WorkExperience)
        const projects = (JSON.stringify(data.user.Projects)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Projects)
        const interests = (JSON.stringify(data.user.Interests)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Interests)
        localStorage.setItem('Education', education);
        localStorage.setItem('workExperience', experience);
        localStorage.setItem('projects', projects)
        localStorage.setItem('interests', interests);
        if(newUser) window.location.reload()
      }else{
        console.log("User error")
      }
    }else{
      alert("Please make sure you fill all the details correctly!!!")
    }
  }

  return (
    <>
    {
      (!newUser)
      ?(
        <NavbarComponent />
      )
      :(
        // <Alert key={'light'} variant={'light'} style={{textAlign:'center'}}>
        //   You need to fill the following details and save them inorder to use the app.
        // </Alert>
        <></>
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
        <center>
          <Button variant="primary" style={{margin:'5%'}} onClick={()=>handleSave()}>Save profile</Button>
        </center>
      </Container>
    </>
  );
}
