import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "../components/navbarComponent";
import { IoIosArrowForward } from "react-icons/io";
import "../styles/messenger.css";
import { Form, InputGroup, ListGroup, Offcanvas } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { currentUser } from "../data";
import MessengerAccountsComponent from "../components/messengerAccountsComponent";
import StartConversationComponent from "../components/startConversationComponent";

export default function MessengerPage() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const connections = currentUser.Connections;
  const [filteredUsers, setFilteredUsers] = useState(connections);
  const [openChat, setOpenChat] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = connections.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };
  const handleConversation = (value) => {
    setOpenChat(value);
    setShow(false);
    setIsVisible(true)
  };
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
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Connections</Offcanvas.Title>
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((connection, index) => {
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
                      connectionName={
                        connection.firstName + " " + connection.lastName
                      }
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
      <StartConversationComponent activeConnection={openChat}/>
    </>
  );
}
