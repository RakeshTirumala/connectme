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
    
    return(
        <>
            <Container className="d-flex justify-content-center">
                <Row style={{gap:'20vw'}}>
                    <Col>
                        <Image src={src} roundedCircle style={{width: '10rem', padding:'0.5rem'}}/>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-start">
                        <Row className="align-items-center">
                            <Button variant="primary" size="sm" 
                            style={{marginRight: '5px'}} onClick={()=>setShowChooseFile(!showChooseFile)}>Edit Profile</Button>
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