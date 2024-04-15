import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitleBarComponent from "../components/titleBarComponent";
import Form from "react-bootstrap/Form";
import { MdOutlinePassword, MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import "../styles/login.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Row, Toast } from "react-bootstrap";
import { primaryColor } from "../constants";

export default function SignUp(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false)
  const [issueToRender, setIssueToRender] = useState("");
  const [progress, setProgress] = useState(false)

  const navigate = useNavigate();

  function settingFieldsToDefault(){
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const addUser = async () => {
    console.log(email, password)
    setProgress(true)

    if(confirmPassword!=="" && password!=="" && email!==""){
      if(confirmPassword===password){
          try {
            const response = await fetch(
              process.env.REACT_APP_SIGNUP_URL_DIGITAL_OCEAN,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email:email, password:password}),
              }
            );

            const status = response.status;
            console.log(status)
            if(status===201){
              navigate('/');
            }else{
              setShowError(true);
              setIssueToRender(`Failed to signup due to ${status}`);
              settingFieldsToDefault();
            }

          } catch (e) {
            console.log(e);
            setShowError(true);
            setIssueToRender(e);
            settingFieldsToDefault();
          }

      }else{
        setShowError(true);
        setIssueToRender("Passwords don't match!");
        settingFieldsToDefault();
      }
    }else{
      setShowError(true);
      setIssueToRender("Fields are empty!");
    }
    setProgress(false)

  };
  return (
    <>
      <section>
        <TitleBarComponent />
      </section>
      <Toast show={showError} onClose={()=>setShowError(false)}>
        <Toast.Header style={{gap:'1vw'}}>
          <strong className="me-auto">ConnectMe</strong>
        </Toast.Header>
        <Toast.Body>{issueToRender}</Toast.Body>
      </Toast>
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
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
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
                  value={password}
                  name="password"
                  onChange={(e)=>setPassword(e.target.value)}
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
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={(e)=>setConfirmPassword(e.target.value)}
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
          {
          (progress===true)
          ?(
            <progress value={null} />
          )
          :(
            <></>
          )
        }
        </Form>
      </section>
    </>
  );
};
