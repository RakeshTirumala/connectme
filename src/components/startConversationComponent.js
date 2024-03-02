import React, { useEffect, useState } from "react";
import { Row, ListGroup, Container, InputGroup, Form, Button, Image } from "react-bootstrap";
import { BiMessageSquare } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import img from '../images/defaultPic.webp'
// import convo1 from '../images/convo1.png'
// import convo2 from '../images/convo2.svg'
import convoStart from '../images/StartConvo.svg'
import { lightTheme } from "../constants";


export default function StartConversationComponent(props) {
  const activeUser = props.activeConnection;
  console.log("Active user:", activeUser.firstName)
  const [chat, setChat] = useState([]);
  console.log("chat:",chat)


  useEffect(()=>{
    const history = [
      { "user": activeUser.firstName, "message": `Hello, This is ${activeUser.firstName}` },
      { "user": activeUser.firstName, "message": "Good morning!!!" },
    ]
    setChat(history)
  },[activeUser.firstName])
  
  const [newMsg, setNewMsg] = useState("");

  const handleSend = () => {
    if (newMsg.trim() !== "") { 
      const updatedChat = [...chat, { user: "user", message: newMsg }];
      setChat(updatedChat);
      setNewMsg(""); 
    }
  };

  return (
    <>
      {activeUser ? (
        <div style={{ position: 'relative', minHeight: '90vh'}}>
          <ListGroup as="ol" style={{ overflowY: "scroll"}}>
            {chat.map((chatComp, index) => {
              const isUser = chatComp.user === "user";
              const listItemStyle = {
                border: "none",
                textAlign: isUser ? "right" : "left" 
              };
              const imageStyle = {
                width: '2.5rem',
                padding: '0.5rem',
                float: isUser ? 'right' : 'left'
              };

              return (
                <ListGroup.Item 
                  data-id={index}
                  key={index} 
                  as="li" 
                  style={listItemStyle}
                >
                  <Image src={img} style={imageStyle} roundedCircle /> {chatComp.message}
                </ListGroup.Item>
              );
            })}
          </ListGroup>

          <div 
          style={{
            position: 'absolute', 
            bottom: 0, 
            width: '100%',
            }}>
              <Container className="d-flex justify-content-center">
                <InputGroup className="mb-3" style={{paddingBottom:'1rem'}}>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Type a message"
                    aria-label="Type a message"
                    aria-describedby="button-addon2"
                    value={newMsg}
                    onChange={(e)=>setNewMsg(e.target.value)}
                    style={{ 
                    boxShadow: 'none',
                    resize:'none'}}
                  />
                    <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    onClick={handleSend}
                    >
                      <IoIosSend/>
                    </Button>
                </InputGroup>
              </Container>

          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor:lightTheme}}>
          <Row style={{justifyContent:"center"}}>
            <Image src={convoStart} style={{width:'18rem'}}/>
            <p style={{ 
              fontSize: "1.0rem", 
              color: "grey", 
              textAlign: "center",
              fontFamily:'monospace',
              marginTop:'3vh'
              }}>
              Start a conversation!
            </p>
          </Row>
        </div>
      )}
    </>
  );
}
