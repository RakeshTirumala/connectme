import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { RxCross1 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";

export default function AddComponent(props){
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")
    const [degree, setDegree] = useState("");
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [projectTitle, setProjectTitle] = useState("");

    return(
        <Container className="mx-auto">
            {
                props.type==="education"
                ?(
                    <Container className="mx-auto">
                    <Container className="mx-auto">
                        <label style={{                
                        fontFamily:'monospace', 
                        fontSize:'16px',
                        cursor:'pointer',
                        fontWeight:'bold',
                        marginTop:'1.5vh'}}>
                            Add Education
                        </label>
                        <Form style={{marginTop:'1.5vh', marginBottom:'1.5vh'}}>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                style={{boxShadow:'none'}}
                                type="text" 
                                placeholder="Degree" 
                                value={degree}
                                onChange={(e)=>setDegree(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                style={{boxShadow:"none"}}
                                type="text" 
                                placeholder="School"
                                value={school}
                                onChange={(e)=>setSchool(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                type="text" 
                                placeholder="Major"
                                style={{boxShadow:'none'}}
                                value={major}
                                onChange={(e)=>setMajor(e.target.value)}
                                />
                            </Form.Group>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{marginBottom: '1rem'}}>
                                    <label style={{marginBottom: '0.5rem', marginRight:'0.5rem'}}>Start date</label>
                                    <DatePicker 
                                    selected={startDate} 
                                    onChange={(nv)=>setStartDate(nv)}
                                    showIcon={true}
                                    />
                                </div>
                                <div>
                                    <label style={{marginBottom: '0.5rem', marginRight:'0.9rem'}}>End date</label>
                                    <DatePicker
                                    selected={endDate}
                                    showIcon={true}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    />
                                </div>
                            </div>
                        </Form>
                        <Button 
                        variant="primary"
                        onClick={props.setAddComponent}
                        style={{marginRight:'1.0vw'}}
                        >Save</Button>
                        <Button 
                        variant="secondary"
                        onClick={props.setAddComponent}
                        ><RxCross1 /></Button>
                    </Container>
                </Container>
                )
                :props.type==="professional"
                ?(
                    <Container className="mx-auto">
                    <Container className="mx-auto">
                        <label style={{                
                        fontFamily:'monospace', 
                        fontSize:'16px',
                        cursor:'pointer',
                        fontWeight:'bold',
                        marginTop:'1.5vh'}}>
                            Add Profession
                        </label>
                        <Form style={{marginTop:'1.5vh', marginBottom:'1.5vh'}}>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                style={{boxShadow:'none'}}
                                type="text" 
                                placeholder="Role" 
                                value={role}
                                onChange={(e)=>setRole(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                style={{boxShadow:"none"}}
                                type="text" 
                                placeholder="Company"
                                value={company}
                                onChange={(e)=>setCompany(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                as="textarea" 
                                placeholder="Description"
                                rows={3}
                                style={{boxShadow:'none'}}
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{marginBottom: '1rem'}}>
                                    <label style={{marginBottom: '0.5rem', marginRight:'0.5rem'}}>Start date</label>
                                    <DatePicker 
                                    selected={startDate} 
                                    onChange={(nv)=>setStartDate(nv)}
                                    showIcon={true}
                                    />
                                </div>
                                <div>
                                    <label style={{marginBottom: '0.5rem', marginRight:'0.9rem'}}>End date</label>
                                    <DatePicker
                                    selected={endDate}
                                    showIcon={true}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    />
                                </div>
                            </div>
                        </Form>
                        <Button 
                        variant="primary"
                        onClick={props.setAddComponent}
                        style={{marginRight:'1.0vw'}}
                        >Save</Button>
                        <Button 
                        variant="secondary"
                        onClick={props.setAddComponent}
                        ><RxCross1 /></Button>
                    </Container>
                </Container>
                )
                :(
                    <Container className="mx-auto">
                    <Container className="mx-auto">
                        <label style={{                
                        fontFamily:'monospace', 
                        fontSize:'16px',
                        cursor:'pointer',
                        fontWeight:'bold',
                        marginTop:'1.5vh'}}>
                            Add Project
                        </label>
                        <Form style={{marginTop:'1.5vh', marginBottom:'1.5vh'}}>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                style={{boxShadow:'none'}}
                                type="text" 
                                placeholder="Project Title" 
                                value={projectTitle}
                                onChange={(e)=>setProjectTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                style={{boxShadow:"none"}}
                                as="textarea"
                                rows={3} 
                                placeholder="Description"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <Button 
                        variant="primary"
                        onClick={props.setAddComponent}
                        style={{marginRight:'1.0vw'}}
                        >Save</Button>
                        <Button 
                        variant="secondary"
                        onClick={props.setAddComponent}
                        ><RxCross1 /></Button>
                    </Container>
                </Container>  
                )
            }
        </Container>
    )
}
