import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Container,
  Form,
  Col,
  FormControl,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import NavbarComponent from "../components/navbarComponent";
import { FaSearch } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import RenderProfessionalsComp from "../components/renderProfessionalsComp";
import RenderStudentComponent from "../components/renderStudentsComponent";

export default function NetworkPage(props) {
  const [key, setKey] = useState("professionals");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <NavbarComponent />
      <Container
        fluid
        className="mx-auto"
        style={{ marginTop: "2vh", backgroundColor: props.background }}
      >
        <Row className="justify-content-center mb-3">
          <Col xs={12} sm={8} md={6}>
            <Form>
              <div className="d-flex" style={{ gap: "2%" }}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-2 rounded-pill flex-grow-1"
                  style={{ boxShadow: "none" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="rounded-pill">
                  <FaSearch />
                </Button>
                <DropdownButton id="dropdown-basic-button" title="Interests">
                  <Dropdown.Item>Software Engineering</Dropdown.Item>
                  <Dropdown.Item>Technology</Dropdown.Item>
                  <Dropdown.Item>Something else</Dropdown.Item>
                </DropdownButton>
              </div>
            </Form>
          </Col>
        </Row>
        <Container fluid className="mx-auto" style={{ paddingLeft: "5%" }}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="professionals" title="Professionals">
              <RenderProfessionalsComp searchQuery={searchQuery} />
            </Tab>
            <Tab eventKey="students" title="Students">
              <RenderStudentComponent searchQuery={searchQuery} />
            </Tab>
          </Tabs>
        </Container>
      </Container>
    </>
  );
}
