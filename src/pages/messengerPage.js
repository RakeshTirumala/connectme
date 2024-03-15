import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "../components/navbarComponent";
import { IoIosArrowForward } from "react-icons/io";
import "../styles/messenger.css";
import { Form, InputGroup, ListGroup, Offcanvas } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { currentUser } from "../data";
import MessengerAccountsComponent from "../components/messengerAccountsComponent";
import StartConversationComponent from "../components/startConversationComponent";
import { FaUsers } from "react-icons/fa";

export default function MessengerPage() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  // const connections = currentUser.Connections;
  const [connections, setConnections] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(connections);
  const [openChat, setOpenChat] = useState("");
  const [ws, setWs] = useState(null);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([]);

  const currentUser = localStorage.getItem('token');

  const handleInputChange = (e) => {
    // const searchTerm = e.target.value;
    // setSearchItem(searchTerm);

    // const filteredItems = connections.filter(
    //   (user) =>
    //     user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // setFilteredUsers(filteredItems);
  };
  const handleConversation = (value) => {
    setOpenChat(value);
    setShow(false);
    setIsVisible(true)
  };

  // ws://monkfish-app-rl7kw.ondigitalocean.app

  useEffect(()=>{
    const ws = new WebSocket(`ws://monkfish-app-rl7kw.ondigitalocean.app?token=${currentUser}`)
    setWs(ws);
    ws.addEventListener('message', handleMessage)
  },[]);

  function handleMessage(e){
    const data = JSON.parse(e.data)
    console.log('online users', data.online);

    if('online' in data) {
      const uniqueConnectionsSet = new Set(data.online.map(obj => JSON.stringify(obj)));
      let uniqueConnectionsArray = Array.from(uniqueConnectionsSet).map(str => JSON.parse(str));
      uniqueConnectionsArray = uniqueConnectionsArray.filter(c=>c.token!==currentUser);
      setConnections(uniqueConnectionsArray);
    }else{
      console.log({data})
    }
  }


  return (
    <>
      <NavbarComponent />
      {isVisible && (
        <div className="icon-container">
          <IoIosArrowForward
            className="arrowButton"
            style={{ fontSize: "30px" }}
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
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ boxShadow: "none" }}
            />
          </InputGroup>
          <ListGroup as="ol" style={{ overflowY: "scroll" }}>
            {connections.length > 0 ? (
              connections.map((connection, index) => {
                return (
                  <ListGroup.Item
                    data-id={index}
                    value={connection}
                    key={index}
                    onClick={() => handleConversation(connection)}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer",
                    }}
                  >
                    <MessengerAccountsComponent
                    connectionID={connection.id}
                    />
                  </ListGroup.Item>
                );
              })
            ) : (
              <div>No Connections found</div>
            )}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <StartConversationComponent activeConnection={openChat} currentUser={currentUser} ws={ws}/>
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