import React from "react";
import TitleBarComponent from "../components/titleBarComponent";
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel'
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import '../styles/login.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from "react-bootstrap";
import { primaryColor } from "../constants";


export default function LoginPage(){
    const navigate = useNavigate();
    const handleLogin=()=>{
        navigate('/explore')
    }
    return(
        <>
            <section>
                <TitleBarComponent/>
            </section>
            <section className="formSection">
                <Form className="formDiv">
                    <span className="loginTitle">Login</span>
                    <div style={{margin:'5vh'}}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            <MdEmail style={{fontSize:'24px'}}/>
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control type="email" placeholder="example@xyz.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            <MdOutlinePassword style={{fontSize:'24px'}}/>
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control type="password" placeholder="Password"/>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="d-grid gap-2" style={{margin:'2rem'}}>
                        <Button 
                        variant="primary" 
                        size="md" 
                        onClick={handleLogin}
                        style={{backgroundColor:primaryColor, 
                        color:'black', fontFamily:'sans-serif',
                        border:'none'}}>Login</Button>
                    </div>
                    <span 
                        style={{
                        fontFamily:'serif', fontSize:'12px'}}>
                        Don't have an account? 
                        <p style={{textDecoration:'underline', cursor:'pointer'}}>Sign up!</p></span>
                </Form>
            </section>
        </>
    )
}