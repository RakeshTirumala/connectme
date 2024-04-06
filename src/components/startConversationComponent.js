import React, { useEffect, useState, useRef } from "react";
import { Row, ListGroup, Container, InputGroup, Form, Button, Image } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import img from '../images/defaultPic.webp'
import convoStart from '../images/StartConvo.svg'
import { lightTheme, primaryColor, secondaryColor } from "../constants";
import { data } from "../data";

export default function StartConversationComponent(props) {
  const activeUser = props.activeConnection;
  const activeUserName =props.activeChatUserFullName;
  const ws = props.ws;
  const [newMsg, setNewMsg] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const messagesEndRef = useRef(null);

  console.log("Current user", props.currentUseremail)

  const fetchPrevChat = async () => {
    try {
      const response = await fetch(`http://localhost:1111/api/chats/byuserId?id=${activeUser}&current=${props.currentUseremail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const { id } = await response.json();
      props.handleFetchedMessages(id);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  }; 

  useEffect(() => {
    props.clearMessages();
    if (activeUser) {
      fetchPrevChat();
    }
  }, [activeUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior:'auto'});
    }
  }, [props.messages]);

  const handleSend = () => {
    if (newMsg.trim() !== "") {
      const dataToSend = {
        senderId: props.currentUseremail,
        receiverId: activeUser,
        text: newMsg
      };
      ws.send(JSON.stringify(dataToSend));
      props.handleMsgs(dataToSend);
      setNewMsg("");
    }
    console.log("Props.messages", props.messages)
  };

  console.log(props.messages)

  return (
    <>
      {activeUser ? (
        <div style={{ 
          position: 'relative', 
          minHeight: 'calc(100vh - 50px)', 
          overflow: 'hidden',
          marginLeft:'5vw',
          marginRight:'5vw'
          }}>
          <div className="d-flex justify-content-center" style={{height:'8vh'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
              <Image src={img} style={{width: '3rem',height:'3rem', padding: '0.5rem'}} roundedCircle />
              <div style={{display:'flex', flexDirection:'column'}}>
                <h6 style={{fontFamily:'monospace', fontWeight:'bold'}}>{activeUserName}</h6>
                {/* <p style={{fontFamily:'monospace', fontSize:'10px'}}>Active Now</p> */}
              </div>
            </div>
          </div>
          <ListGroup as="ol" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            {
            (!props.messages)
              ?(
                <p>Loading...</p>
              )
              :(
                props.messages.map((msgComp, index) => {
                  const isSender = (msgComp.receiverId !== props.currentUseremail);
                  const listItemStyle = {
                    border: "none",
                    textAlign: isSender ? "right" : "left",
                  };
                  const imageStyle = {
                    width: '2.5rem',
                    padding: '0.5rem',
                    float: isSender ? 'right' : 'left',
                  };

                  const textStyle = {
                    maxWidth:'180px',
                    padding:'0.5rem',
                    float: isSender ? 'right' : 'left',
                    backgroundColor:secondaryColor,
                    borderRadius:'1rem',
                    textAlign:'justify',
                    color:"black",
                    fontFamily:'monospace'
                  }
    
                  return (
                    <ListGroup.Item
                      data-id={index}
                      key={index}
                      as="li"
                      style={listItemStyle}
                    >
                      <Image src={img} style={imageStyle} roundedCircle /> 
                      <p style={textStyle}>{msgComp.text}</p>
                    </ListGroup.Item>
                  );
                })
              )
            }
            <div ref={messagesEndRef} />
          </ListGroup>
          <div style={{position: 'absolute', bottom: 0, width: '100%',}}>
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
                  onClick={handleSend}>
                  <IoIosSend/>
                </Button>
              </InputGroup>
            </Container>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: lightTheme }}>
          <Row style={{ justifyContent: "center" }}>
            <Image src={convoStart} style={{ width: '15rem' }} />
            <p style={{
              fontSize: "1.0rem",
              color: "grey",
              textAlign: "center",
              fontFamily: 'monospace',
              marginTop: '3vh'
            }}>
              Start a conversation!!
            </p>
          </Row>
        </div>
      )}
    </>
  );
}
