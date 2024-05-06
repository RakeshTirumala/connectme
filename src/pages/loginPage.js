import React, { useEffect, useState } from "react";
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

export default function LoginPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(false);

  // const newUser = true;

  // console.log("email", email, "password", password);

  // const settingTheme=()=>{
  //   //SETTING THEME
  //   const theme = localStorage.getItem(`${email}Theme`);
  //   // if(theme===undefined) localStorage.setItem(`${email}Theme`, false);
  //   props.handleBG((!theme)?false:theme);
  // }

  const onKeyPressCustom=(event)=>{
    if(event.key==='Enter') handleLogin()
  }

  const handleLogin = async () => {
    setProgress(true);
    console.log(email, password);
    try {
      // process.env.REACT_APP_LOGIN_URL_DIGITAL_OCEAN
      // 'http://localhost:1111/api/login'
      const response = await fetch(
        process.env.REACT_APP_LOGIN_URL_DIGITAL_OCEAN,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
          credentials:'include'
        }
      );

      console.log("response", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("email", email)

        //SETTING THEME
        const theme = localStorage.getItem(`${email}Theme`);
        console.log(`Theme of ${email}`, theme);
        // console.log(theme)
        if(!JSON.parse(theme))localStorage.setItem(`${email}Theme`, false);
        props.handleBG(!JSON.parse(theme)?false:true)

        console.log("user:",JSON.stringify(responseData.user))
        localStorage.setItem('user', JSON.stringify(responseData.user));

        localStorage.setItem('newUser', responseData.user.newUser);
        localStorage.setItem('firstName', responseData.user.firstName);
        localStorage.setItem('lastName', responseData.user.lastName);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('mobile', responseData.user.mobile);
        localStorage.setItem('userType', responseData.user.userType);
        // console.log("The education that I am going to insert", (JSON.stringify(responseData.user.Education)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.Education))
        
        const education = (JSON.stringify(responseData.user.education)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.education)
        const experience = (JSON.stringify(responseData.user.workExperience)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.workExperience)
        const projects = (JSON.stringify(responseData.user.projects)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.projects)
        const interests = (JSON.stringify(responseData.user.interests)===undefined)?JSON.stringify([]):JSON.stringify(responseData.user.interests)
        // const dp = (JSON.stringify(responseData.user.dp)===undefined)?"":responseData.user.dp
        console.log("education", education)
        localStorage.setItem('Education', education);
        localStorage.setItem('workExperience', experience);
        localStorage.setItem('projects', projects)
        localStorage.setItem('interests', interests);
        localStorage.setItem('dp', (!responseData.user.dp)?"":responseData.user.dp);

        localStorage.setItem('liked', JSON.stringify(responseData.user.liked));
        localStorage.setItem('commented', JSON.stringify(responseData.user.commented));
        localStorage.setItem('posts', JSON.stringify(responseData.user.posts));


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

    setProgress(false)
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
                  onKeyDown={(event)=>onKeyPressCustom(event)}
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
          (progress)
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
