import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { PiStudentDuotone } from "react-icons/pi";
import { RiBuilding2Line } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { PiIdentificationCard } from "react-icons/pi";
import img from "../images/defaultPic.webp";

export default function SelectedUserDpComponent(props){
    const [connectionReq, setConnectionReq] = useState(false);
        useEffect(() => {
        if (props.connections && props.connections.includes(props.currentUser)) {
            setConnectionReq(true);
        }
    }, [props.connections, props.currentUser]);

    const handleConnect=async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_NETWORK_URL_DIGITAL_OCEAN}/requests`,{
                method:'PUT',
                headers:{"Content-Type":"application/json"},
                credentials:'include',
                body:JSON.stringify({currentUser:props.currentUser, targetUser:props.email})
              })
              if(response.ok){
                setConnectionReq(true);
              }
        }catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <Container 
        fluid className="d-flex justify-content-center" 
        style={{
            backgroundColor:props.background, color:props.fontColor, 
            fontFamily:'sans-serif', borderBottom:"1px solid lightgrey"}}>
            <Row style={{gap:'15vw'}}>
                <Col>
                    <Row>
                        <Col style={{}}>
                            <Image 
                                src={(props.dp)?props.dp:img} 
                                roundedCircle 
                                style={{width: '10rem', padding:'0.5rem'}}
                            />
                        </Col>
                    </Row>
                    <p style={{fontWeight:'600'}}>{props.firstName} {props.lastName}</p>
                    {
                            props.userType==="Student"
                            ?(
                                <p>Student <PiStudentDuotone /></p> 
                            )
                            :(
                                <p>Employee <RiBuilding2Line /></p>
                            )
                    }
                </Col>
                <Col style={{   paddingTop:'10vh', paddingBottom:'2vh'}}>
                    {
                        (props.mobile)
                        ?(
                            <p><FaPhoneAlt/> {props.mobile}</p>
                        )
                        :(
                            <></>
                        )
                    }
                    <p style={{}}><PiIdentificationCard /> {props.email}</p>
                    {
                        (props.connections)
                        ?(
                            <p>Connections {props.connections.length}</p>
                        )
                        :(
                            <p>Connections 0</p>
                        )
                    }
                    <Button
                        variant="primary"
                        disabled={props.requests && props.requests.includes(props.currentUser) || connectionReq}
                        onClick={() => handleConnect()}
                    >
                        {props.requests && props.requests.includes(props.currentUser) || connectionReq ? "Requested!" : "Connect"}
                    </Button>

                </Col>
            </Row>
        </Container>
    </>
    )
}
