import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "../components/navbarComponent";
import { IoIosArrowForward } from "react-icons/io";
import "../styles/messenger.css";
import { Form, Image, InputGroup, ListGroup, Offcanvas } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { currentUser } from "../data";
import MessengerAccountsComponent from "../components/messengerAccountsComponent";
import StartConversationComponent from "../components/startConversationComponent";
import { FaUsers } from "react-icons/fa";
import nullIm from '../images/null.svg'

export default function MessengerPage() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  // const connections = currentUser.Connections;
  const [connections, setConnections] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openChat, setOpenChat] = useState("");
  const [activeChatUserFullName, setActiveChatUserFullName] = useState("");
  const [ws, setWs] = useState(null);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([])
  const [chatsData, setChatsData] = useState();
  const [prevConvo, setPrevConvo] = useState([])
  const currentUser = localStorage.getItem('token');
  const currentUseremail = localStorage.getItem('email');
  const [usersToMsgsObj, setUsersToMsgsObj] = useState({})
  const [data, setData] = useState({});


  //  FETCHING CONNECTIONS OF THE USER
  useEffect(()=>{
    fetchConnectionsOfUser()
    fetchPrevConvo()
  },[])


  // FETCHING CONNECTIONS OF A PARTICULAR USER
  const fetchConnectionsOfUser=async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_MESSENGER_URL_DIGITAL_OCEAN}?email=${currentUseremail}`, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
      })
      const data = await response.json();
      console.log("Connections of this user:", data.connections)
      setConnections(data.connections)
    }catch(error){
      console.log();
    }
  }

  useEffect(()=>{
    fetchPrevConvo()
  },[messages])

  // FETCHING PAST CONVERSATIONS OF A USER
  const fetchPrevConvo=async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_MESSENGER_URL_DIGITAL_OCEAN}/pastConversations?email=${currentUseremail}`,{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      })
      const {prevConv} = await response.json();
      console.log("prevConvp", prevConv);

      setPrevConvo(prevConv)

    }catch(error){
      console.log(error);
    }
  }

  console.log(searchItem)
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  
    let filteredItems;
    
    if (searchTerm.trim() === '') {
      // If the search term is empty, reset filteredItems to the original list of connections
      filteredItems = [];
    } else {
      // Otherwise, filter connections based on the search term
      filteredItems = connections.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    console.log("Filtered Items", filteredItems);
    setFilteredUsers(filteredItems);
  };
  

  const handleConversation = (value, firstName, lastName) => {
    console.log("id:",value)
    setOpenChat(value);
    setActiveChatUserFullName(`${firstName} ${lastName}`)
    setShow(false);
    setIsVisible(true)
  };

  // ws://monkfish-app-rl7kw.ondigitalocean.app

  // WEBSOCKET EVENTS
  useEffect(()=>{
    const ws = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}?token=${currentUser}&email=${currentUseremail}`)
    setWs(ws);
    ws.addEventListener('message', handleMessage)
  },[]);

  function handleMessage(e){
    const data = JSON.parse(e.data)
    console.log('Websocket data:', data);

    if('online' in data) {
      // let onlineConnections = [data.online]
      // console.log(onlineConnections)
      // onlineConnections = onlineConnections[0].filter(x=> x.id!==currentUseremail);
      // const people = new Set();
      // const connectionWhoAreOnline = [];
      // onlineConnections.forEach((connection)=>{
      //   if(!people.has(connection.id)){
      //     people.add(connection.id)
      //     connectionWhoAreOnline.push(connection)
      //   }
      // })
      // console.log("your connections:",JSON.stringify(connectionWhoAreOnline))
      // setConnections(connectionWhoAreOnline);
    }else{
      console.log(data)
      const {senderId, receiverId, text} = data
      console.log("[MESSENGER PAGE] ", "receipient:", receiverId, "text:", text)
      console.log("sender", senderId, "Receiver", receiverId, "open", openChat)
      setData(data)
      console.log(senderId===openChat)
      // let msgsWithThatSender = usersToMsgsObj[senderId];
      // msgsWithThatSender = [...msgsWithThatSender, data]
      // usersToMsgsObj[senderId] = msgsWithThatSender;
    }
  }

  useEffect(()=>{
    const {senderId, receiverId, text} = data
    if((senderId===openChat)) setMessages(prev=>[...prev, data])
  },[data])

  // const handleMsgsFromSender=(data, id)=>{
  //   if(usersToMsgsObj.hasOwnProperty(id)){
  //     let msgsWithThatSender = usersToMsgsObj[id];
  //     msgsWithThatSender = [...msgsWithThatSender, data]
  //     usersToMsgsObj[id] = msgsWithThatSender;
  //   }else{
  //     usersToMsgsObj[id] = [data];
  //   }
  // }

  function handleFetchedMessages(data){
    if(messages.length===0) setMessages(data)
    else setMessages(prev=>[...prev, data])
  }
  function handleMsgs(data){
    setMessages(prev=>[...prev, data]);
  }
  function clearMessages(){
    setMessages(prevMessages => {
      prevMessages.splice(0, prevMessages.length);
      return [...prevMessages];
    });
  };

  return (
    <>
      <NavbarComponent />
      {isVisible && (
        <div className="icon-container">
          <IoIosArrowForward
            className="arrowButton"
            style={{ fontSize: "30px"}}
            onClick={() => {
              setShow(true);
              setIsVisible(false);
            }}
          />
        </div>
      )}
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
          setIsVisible(true);
        }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><FaUsers/> <strong>Connections</strong></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ cursor: "pointer" }}>
              <IoSearch />
            </InputGroup.Text>
            <Form.Control
              onChange={handleInputChange}
              value={searchItem}
              placeholder="Search your connection"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ boxShadow: "none" }}
            />
          </InputGroup>
          <ListGroup as="ol" style={{ overflowY: "scroll" }}>
            {
            
            (filteredUsers.length>0)?
            (
              filteredUsers.map((connection, index)=>{
                return(
                  <ListGroup.Item
                    data-id={index}
                    value={connection}
                    key={index}
                    onClick={() => handleConversation(connection.email, connection.firstName, connection.lastName)}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer",
                    }}
                  > 
                    <MessengerAccountsComponent
                    connection={connection.email}
                    connectionFirstname = {connection.firstName}
                    connectionLastName = {connection.lastName}
                    dp={connection.dp}
                    />
                  </ListGroup.Item>
                )
              })
            )
            :(
              prevConvo.length > 0 ? (
                prevConvo.map((connection, index) => {
                  return (
                    <ListGroup.Item
                      data-id={index}
                      value={connection}
                      key={index}
                      onClick={() => handleConversation(connection.email, connection.firstName, connection.lastName)}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        cursor: "pointer",
                      }}
                    >
                      <MessengerAccountsComponent
                      connection={connection.email}
                      connectionFirstname = {connection.firstName}
                      connectionLastName = {connection.lastName}
                      latestMsgInConvo = {connection.chat.text}
                      dp={connection.dp}
                      />
                    </ListGroup.Item>
                  );
                })
              ) : (
                <center style={{padding:'20%'}}>
                  <Image src={nullIm} style={{width:'8rem',  transform: 'scaleX(-1)'}}/>
                  <p style={{color:'grey', fontFamily:'monospace'}}>No previous chats</p>
                </center>
              )
            )
            }
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <StartConversationComponent 
        activeConnection={openChat} 
        activeChatUserFullName={activeChatUserFullName}
        currentUser={currentUser} ws={ws} 
        handleMsgs={handleMsgs}
        messages={messages} 
        currentUseremail={currentUseremail}
        usersToMsgsObj={usersToMsgsObj}
        handleFetchedMessages={handleFetchedMessages}
        clearMessages={clearMessages}
      />
    </>
  );
}


// {filteredUsers.length > 0 ? (
//   filteredUsers.map((connection, index) => {
//     return (
//       <ListGroup.Item
//         data-id={index}
//         value={connection}
//         key={index}
//         onClick={() => handleConversation(connection)}
//         as="li"
//         className="d-flex justify-content-between align-items-start"
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           cursor: "pointer",
//         }}
//       >
//         <MessengerAccountsComponent
//         connectionID={connection.id}
//         />
//       </ListGroup.Item>
//     );
//   })
// ) : (
//   <div>No Connections found</div>
// )}