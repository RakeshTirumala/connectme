import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/navbarComponent";
import { Accordion, Container, ListGroup, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { IoLogOut } from "react-icons/io5";
import HelpComponent from "../components/helpComponent";
import PasswordChangeComponen from "../components/passwordChangeComponent";
import LikedPosts from "../components/likedPosts";
import CommentedPosts from "../components/commentedPosts";
import { useNavigate } from "react-router-dom";

export default function SettingsPage(props) {
  const [darkTheme, setDarkTheme] = useState(props.themeData);
  const [liked, setLiked] = useState([]);
  const [commented, setCommented] = useState([]);
  const email = localStorage.getItem('email');

  const navigate = useNavigate();

  const onTrigger = () => {
    setDarkTheme(!darkTheme);
    props.handleBG(!darkTheme);
  };

  useEffect(()=>{
    localStorage.setItem(`${email}Theme`, darkTheme)
    console.log("theme now", darkTheme)
  },[darkTheme])

  useEffect(()=>{
    setLiked(JSON.parse(localStorage.getItem('liked')))
    setCommented(JSON.parse(localStorage.getItem('commented')))
  },[])

  console.log("Theme", darkTheme)

  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('newUser');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('mobile');
    localStorage.removeItem('userType');
    localStorage.removeItem('Education');
    localStorage.removeItem('workExperience');
    localStorage.removeItem('projects');
    localStorage.removeItem('interests');
    localStorage.removeItem('dp');
    localStorage.removeItem('liked');
    localStorage.removeItem('commented');
    localStorage.removeItem('posts');
    navigate('/');
  }

  return (
    <>
      <NavbarComponent background={props.background} fontColor={props.fontColor} themeData={props.themeData} />
      <Container fluid className="mx-auto" style={{backgroundColor:props.background, minHeight:'100vh', paddingTop:'2vh'}}>
        <Container fluid className="mx-auto" style={{ paddingLeft: "5%"}}>
          <Accordion defaultActiveKey="0" className={`accordion-${props.background}`}>
            <Accordion.Item eventKey="0" key={0}>
              <Accordion.Header>Help</Accordion.Header>
              <Accordion.Body style={{backgroundColor:props.background, color:props.fontColor}}>
                <HelpComponent background={props.background} fontColor={props.fontColor}/>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" key={1}>
              <Accordion.Header>Change Password</Accordion.Header>
              <Accordion.Body style={{backgroundColor:props.background, color:props.fontColor}}>
                <PasswordChangeComponen 
                background={props.background} fontColor={props.fontColor} handleLogout={handleLogout} currentUser={email}/>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" key={2}>
              <Accordion.Header>Activity</Accordion.Header>
              <Accordion.Body style={{backgroundColor:props.background, color:props.fontColor}}>
                <Tabs>
                    <Tab eventKey="liked" title="Liked" key="liked">
                        <LikedPosts likedPosts={liked} background={props.background} fontColor={props.fontColor}/>
                    </Tab>
                    <Tab eventKey="commented" title="Commented" key="commented">
                        <CommentedPosts commentedPosts={commented} background={props.background} fontColor={props.fontColor}/>
                    </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <ListGroup style={{ marginTop: "5vh"}}>
            <ListGroup.Item
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:props.background,
                color:props.fontColor
              }}
              key={1}
            >
              Dark Theme
              <BootstrapSwitchButton
                checked={darkTheme}
                size="sm"
                onChange={onTrigger}
              />
            </ListGroup.Item>
            <ListGroup.Item 
            style={{ 
              cursor: "pointer", backgroundColor:props.background,
              color:props.fontColor}} key={2}
              onClick={()=>handleLogout()}
              >
              Logout <IoLogOut />
            </ListGroup.Item>
          </ListGroup>
        </Container>
      </Container>
    </>
  );
}
