import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitleBarComponent from "../components/titleBarComponent";
import Form from "react-bootstrap/Form";
import { MdOutlinePassword, MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import "../styles/login.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Row } from "react-bootstrap";
import { primaryColor } from "../constants";

export default function SignUp(){
  const userData = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const addUser = async (e) => {
    console.log(inputs);
    e.preventDefault();
    navigate("/");
    /*const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await fetch(
        "http://localhost:8080/project/addUser",
        requestOptions
      );
      const data = await response.json();
      if (data.id !== "") {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }*/
  };
  const [inputs, setInputs] = useState(userData);
  const setUserData = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <section>
        <TitleBarComponent />
      </section>
      <section className="formSection">
        <Form className="formDiv">
          <span className="loginTitle">Sign Up</span>
          <div style={{ margin: "5vh" }}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                <MdEmail style={{ fontSize: "24px" }} />
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="example@xyz.com"
                  value={inputs.email || ""}
                  onChange={setUserData}
                  style={{boxShadow:'none'}}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                <TbPassword style={{ fontSize: "24px" }} />
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={inputs.password || ""}
                  name="password"
                  onChange={setUserData}
                  style={{boxShadow:'none'}}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                <MdOutlinePassword style={{ fontSize: "24px" }} />
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={inputs.confirmPassword || ""}
                  name="confirmPassword"
                  onChange={setUserData}
                  style={{boxShadow:'none'}}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="d-grid gap-2" style={{ margin: "2rem" }}>
            <Button
              variant="primary"
              size="md"
              onClick={addUser}
              style={{
                backgroundColor: primaryColor,
                color: "black",
                fontFamily: "sans-serif",
                border: "none",
              }}
            >
              Sign Up
            </Button>
          </div>
          <span
            style={{
              fontFamily: "serif",
              fontSize: "12px",
            }}
          >
            Already have an account?
            <p style={{ textDecoration: "underline", cursor: "pointer" }}>
              <Link to={"/"} style={{color:'black'}}> Login!</Link>
            </p>
          </span>
        </Form>
      </section>
    </>
  );
};
