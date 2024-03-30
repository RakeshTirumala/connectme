import React, { useState } from "react";
import TitleBarComponent from "../components/titleBarComponent";
import Form from "react-bootstrap/Form";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import "../styles/login.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Row } from "react-bootstrap";
import { primaryColor } from "../constants";
import Toast from "react-bootstrap/Toast";
import { FaLock } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(false);

  // const newUser = true;

  console.log("email,", email, "password", password);

  const handleLogin = async () => {
    setProgress(true);
    console.log(email, password);
    // process.env.REACT_APP_LOGIN_URL_DIGITAL_OCEAN
    try {
      const response = await fetch(
        "http://localhost:1111/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      console.log("response", response);
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("email", email)
        console.log("user:",JSON.stringify(responseData.user))
        localStorage.setItem('user', JSON.stringify(responseData.user));

        localStorage.setItem('newUser', responseData.user.newUser);
        localStorage.setItem('firstName', responseData.user.firstName);
        localStorage.setItem('lastName', responseData.user.lastName);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('mobile', responseData.user.mobile);
        localStorage.setItem('userType', responseData.user.userType);
        console.log("The education that I am going to insert", (JSON.stringify(responseData.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.Education))
        
        const education = (JSON.stringify(responseData.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.Education)
        const experience = (JSON.stringify(responseData.user.workExperience)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.workExperience)
        const projects = (JSON.stringify(responseData.user.projects)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.projects)
        
        localStorage.setItem('Education', education);
        localStorage.setItem('workExperience', experience);
        localStorage.setItem('projects', projects)

        // navigate("/explore");
        if(JSON.parse(localStorage.getItem('user')).newUser){
          navigate('/profile')
          localStorage.setItem('newUser', true);
        }
        else navigate("/explore");
      }
    } catch (error) {
      console.log("error", error);
      setShowError(true);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
      <section>
        <TitleBarComponent />
      </section>
      <Toast show={showError} onClose={() => setShowError(false)}>
        <Toast.Header style={{ gap: "1vw" }}>
          <FaLock />
          <strong className="me-auto">ConnectMe</strong>
        </Toast.Header>
        <Toast.Body>Invalid credentials!</Toast.Body>
      </Toast>
      <section className="formSection">
        <Form className="formDiv">
          <span className="loginTitle">Login</span>
          <div style={{ margin: "5vh" }}>
            {/* email */}
            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                <MdEmail style={{ fontSize: "24px" }} />
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="example@xyz.com"
                  style={{ boxShadow: "none" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>

            {/* password */}
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
                  style={{ boxShadow: "none" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="d-grid gap-2" style={{ margin: "2rem" }}>
            <Button
              variant="primary"
              size="md"
              onClick={handleLogin}
              style={{
                backgroundColor: primaryColor,
                color: "black",
                fontFamily: "sans-serif",
                border: "none",
              }}
            >
              Login
            </Button>
          </div>
          <span
            style={{
              fontFamily: "serif",
              fontSize: "12px",
            }}
          >
            Don't have an account?
            <p style={{ textDecoration: "underline", cursor: "pointer" }}>
              <Link to={"/signup"} style={{ color: "black" }}>
                Sign up!
              </Link>
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
}
