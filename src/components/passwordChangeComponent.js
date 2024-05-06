import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Form } from "react-bootstrap";

export default function PasswordChangeComponen(props){
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState(""); 
    const handlePasswordUpdate=async()=>{
        if(newPassword.trim()!=="" && confirmPass.trim()!=="" && newPassword===confirmPass){
            const response = await fetch(`${process.env.REACT_APP_USER_URL_DIGITAL_OCEAN}/password`, {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                credentials:'include',
                body:JSON.stringify({
                    currentUser:props.currentUser,
                    newPassword:newPassword
                })
            })
            if(response.ok){
                props.handleLogout();
            }
        }
    }

    return(
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter new password" 
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        style={{background:props.background, color:props.fontColor}}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm new password"
                        value={confirmPass}
                        onChange={(e)=>setConfirmPass(e.target.value)}
                        style={{background:props.background, color:props.fontColor}}
                    />
                </Form.Group>
            </Form>
            <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={()=>handlePasswordUpdate()}>
                        Update
                    </Button>
            </div>
        </Container>
    )
}