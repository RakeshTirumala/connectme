import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import img from '../images/defaultPic.webp';
import { PiStudentDuotone } from "react-icons/pi";
import { RiBuilding2Line } from "react-icons/ri";
import Avatar from 'react-avatar-edit'


export default function ProfileDpComponent(props){
    const [showChooseFile, setShowChooseFile] = useState(false);
    const data = localStorage.getItem('dp')
    console.log("data", data)
    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState(data)
    const [fileSrc, setFileSrc] = useState(null)
    
    const onClose=()=>{
        setShowChooseFile(!showChooseFile)
        console.log("preview:", preview, "preview length", preview.length)
        localStorage.setItem('dp', preview)
    }
    const onCrop=(view)=>{
        setPreview(view)
    }

    // console.log("src:", src)

    useEffect(()=>{
        (!preview)?setSrc(img):setSrc(preview)
    },[preview])
    // console.log("dp", localStorage.getItem('dp'))

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
        const dp = localStorage.getItem('dp')
        
        console.log("interests", interests)
        console.log("dp profile page", dp)
        // console.log(education.length)
    
        // const data = {fn:fn, ln:ln, mobile:mobile, education:education,
        //   experience:experience, projects:projects, interests:interests, email:email,newUser:false, userType:userType}
        // console.log(data)
    
        if(fn && ln && JSON.parse(interests).length > 0){
          const response = await fetch(process.env.REACT_APP_PROFILE_URL_DIGITAL_OCEAN, {
            method:'PUT',
            headers: { "Content-Type": "application/json" },
            credentials:'include',
            body:JSON.stringify({fn:fn, ln:ln, mobile:mobile, education:education,
            experience:experience, projects:projects, interests:interests, email:email,newUser:false, userType:userType, dp:dp})
          })
          if(response.ok){
            const data = await response.json();
            console.log("user", JSON.stringify(data.user))
            localStorage.setItem('newUser', data.user.newUser);
            // setNewUser(data.user.newUser)
            props.setNewUserFunction(data.user.newUser)
            localStorage.setItem('firstName', data.user.firstName);
            localStorage.setItem('lastName', data.user.lastName);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('mobile', data.user.mobile);
            localStorage.setItem('userType', data.user.userType);
            localStorage.setItem('dp', data.user.dp);
            // console.log("The education that I am going to insert", (JSON.stringify(responseData.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.Education))
            
            const education = (JSON.stringify(data.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Education)
            const experience = (JSON.stringify(data.user.WorkExperience)===undefined)?JSON.stringify([]):JSON.stringify(data.user.WorkExperience)
            const projects = (JSON.stringify(data.user.Projects)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Projects)
            const interests = (JSON.stringify(data.user.Interests)===undefined)?JSON.stringify([]):JSON.stringify(data.user.Interests)
            localStorage.setItem('Education', education);
            localStorage.setItem('workExperience', experience);
            localStorage.setItem('projects', projects)
            localStorage.setItem('interests', interests);
            // if(!newUser) window.location.reload()
          }else{
            console.log("User error")
          }
        }else{
          alert("Please make sure you fill all the details correctly!!!")
        }
      }
    
    return(
        <>
            <Container className="d-flex justify-content-center">
                <Row style={{gap:'20vw'}}>
                    <Col>
                        <Image 
                        src={src} 
                        roundedCircle 
                        style={{width: '10rem', padding:'0.5rem', cursor:"pointer"}}
                        onClick={()=>setShowChooseFile(!showChooseFile)}
                        />
                    </Col>
                    <Col className="d-flex align-items-center justify-content-start" style={{color:props.fontColor}}>
                        <Row className="align-items-center">
                            <Button variant="primary" size="sm" 
                            style={{marginRight: '5px'}} onClick={()=>handleSave()}>Save Profile</Button>
                            {
                                props.userType==="Student"
                                ?(
                                    <p style={{marginTop: '2vh', textAlign: 'center'}}><PiStudentDuotone /> Student</p> 
                                )
                                :props.userType==="Employee"
                                ?(
                                    <p style={{marginTop: '2vh', textAlign: 'center'}}><RiBuilding2Line /> Employee</p>
                                )
                                :(
                                    <p style={{marginTop: '2vh', textAlign: 'center'}}> Yet to fill</p>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
            <center>
                {
                    showChooseFile && (
                        <Avatar 
                        width={400}
                        height={300}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={fileSrc}
                        exportSize={200}
                        />
                    )
                }
            </center>
        </>
    )
}