import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Accordion, Button, Container, Form } from "react-bootstrap";
import { MdOutlineInterests } from "react-icons/md";
import { lightTheme } from "../constants";

export default function InterestsComponent(){
    const [selectedInterests, setSelectedInterests] = useState([]);
    const map = {"Software Engineer":"SWE", "Human Resources":"HR", "Product Management":"PM"}
    console.log(selectedInterests)

    return(
        <Container fluid className="mx-auto" style={{marginTop:'3vh'}}>
            <label
            style={{
            marginLeft: "3vw",
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "2vh",
            }}>Interests <MdOutlineInterests />
            </label>
            <Container fluid className="mx-auto">
                <Container fluid className="mx-auto">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item>
                            <Accordion.Header>
                                {
                                    selectedInterests.map((interest)=>{
                                        return(
                                            <div 
                                            style={{
                                            borderRadius:'5rem',  
                                            height:'2rem',
                                            width:'3rem',
                                            marginRight:'1vw',
                                            backgroundColor:lightTheme, 
                                            border: "0.5px solid black",
                                            boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)"}}>
                                                <label 
                                                style={{
                                                    fontFamily:'monospace',
                                                    fontWeight:'bold',
                                                    justifyContent:"center",
                                                    textAlign:'left',
                                                    padding:'1vh'
                                                    }}>{map[interest]}</label>
                                            </div>
                                        )
                                    })
                                }
                            </Accordion.Header>
                            <Accordion.Body>
                            <Form>
                                <Form.Check 
                                    type="checkbox"
                                    id="1"
                                    label="Software Engineer"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedInterests([...selectedInterests, "Software Engineer"]);
                                        } else {
                                            setSelectedInterests(selectedInterests.filter(interest => interest !== "Software Engineer"));
                                        }
                                    }}
                                />
                                <Form.Check 
                                    type="checkbox"
                                    id="2"
                                    label="Human Resources"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedInterests([...selectedInterests, "Human Resources"]);
                                        } else {
                                            setSelectedInterests(selectedInterests.filter(interest => interest !== "Human Resources"));
                                        }
                                    }}
                                />
                                <Form.Check 
                                    type="checkbox"
                                    id="3"
                                    label="Product Management"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedInterests([...selectedInterests, "Product Management"]);
                                        } else {
                                            setSelectedInterests(selectedInterests.filter(interest => interest !== "Product Management"));
                                        }
                                    }}
                                />
                            </Form>
                            <Button variant="primary" style={{marginTop:'3vh', borderRadius:'5rem'}}>Update</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </Container>
        </Container>
    )
}