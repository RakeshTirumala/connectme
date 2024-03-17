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

  console.log("email,", email, "password", password);

  const handleLogin = async () => {
    console.log(email, password);

    try {
      const response = await fetch(
        process.env.REACT_APP_LOGIN_URL_DIGITAL_OCEAN,
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
        navigate("/explore");
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
        </Form>
      </section>
    </>
  );
}
