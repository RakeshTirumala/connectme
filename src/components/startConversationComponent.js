import React, { useEffect, useState, useRef } from "react";
import { Row, ListGroup, Container, InputGroup, Form, Button, Image } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import img from '../images/defaultPic.webp'
import convoStart from '../images/StartConvo.svg'
import { lightTheme, primaryColor, secondaryColor } from "../constants";
import { data } from "../data";
// import Picker from 'emoji-picker-react';
import { RiEmojiStickerLine } from "react-icons/ri";
import 'emoji-picker-element';  

export default function StartConversationComponent(props) {
  const activeUser = props.activeConnection;
  const activeUserName =props.activeChatUserFullName;
  const ws = props.ws;
  const [newMsg, setNewMsg] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const messagesEndRef = useRef(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const [emojiPickerTheme, setEmojiPickerTheme] = useState("light")

  useEffect(()=>{
    (props.fontColor==="white")?setEmojiPickerTheme("dark"):setEmojiPickerTheme("light")
  },[props.fontColor])

  console.log("Current user", props.currentUseremail)
   

  const fetchPrevChat = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_CHATS_URL_DIGITAL_OCEAN}/byuserId?id=${activeUser}&current=${props.currentUseremail}`, {
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


  useEffect(()=>{
    if(emojiPickerVisible){
      document.querySelector('emoji-picker')
      .addEventListener('emoji-click', event => setNewMsg(prev=>prev+event.detail.unicode));
    }
  },[emojiPickerVisible])


  return (
    <Container fluid className="mx-auto" style={{backgroundColor:props.background, width:'100%'}}>
      {activeUser ? (
        <div style={{ 
          position: 'relative', 
          minHeight: 'calc(100vh - 50px)', 
          overflow: 'hidden',
          marginLeft:'5vw',
          marginRight:'5vw',
          backgroundColor: props.background
          }}>
          <div className="d-flex justify-content" style={{ height: '8vh', color: props.fontColor, marginTop: '1vh' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Image src={(!props.displayPicture) ? img : props.displayPicture} style={{ width: '3rem', height: '3rem', padding: '0.5rem' }} roundedCircle />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h6 style={{ fontFamily: 'monospace', fontWeight: 'bold', margin: '0' }}>{activeUserName}</h6>
              </div>
            </div>
          </div>

          <ListGroup as="ol" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',  backgroundColor: props.background}}>
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
                    backgroundColor: props.background
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
                      {/* <Image src={img} style={imageStyle} roundedCircle />  */}
                      <p style={textStyle}>{msgComp.text}</p>
                    </ListGroup.Item>
                  );
                })
              )
            }
            <div ref={messagesEndRef} />
          </ListGroup>

          {
            emojiPickerVisible &&
            (
              <div style={{ position:'absolute', bottom:'75%', maxHeight: '50px', marginLeft:'1vw'}}>
                <emoji-picker class={emojiPickerTheme}></emoji-picker>
              </div>
            )
          }
          {/* <div style={{ position: 'absolute', bottom: '70vh', maxHeight: '50px', marginLeft:'1vw'}}>
              <Picker open={emojiPickerVisible} onEmojiClick={onEmojiClick} width={300} height={350}/>
          </div> */}
          <div style={{position: 'absolute', bottom: 0, width: '100%',}}>
            <Container className="d-flex justify-content-center">
              <InputGroup className="mb-3" style={{paddingBottom:'1rem'}}>
                <Button 
                  variant="secondary" 
                  id="button-addon2"
                  onClick={()=>setEmojiPickerVisible(!emojiPickerVisible)}>
                  <RiEmojiStickerLine/>
                </Button>
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
                    resize:'none',
                    backgroundColor: props.background,
                    borderColor:'none',
                    borderWidth:'0px',
                    borderTopColor:'lightgrey',
                    borderWidth:'1px',
                    color:props.fontColor
                    
                  }}
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
        <div style={{ display: "flex", justifyContent: "center",
         alignItems: "center", height: "100vh", backgroundColor: props.background }}>
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
    </Container>
  );
}
