import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { GrProjects } from "react-icons/gr";
import { Accordion, Container } from "react-bootstrap";
import { currentUser } from "../data";
import { IoIosAdd } from "react-icons/io";
import AddComponent from "./addComponent";

export default function ProjectsComponent(){
    const [showAddComponent, setShowAddComponent] = useState(false)

    const setAddComponent=()=>{
      setShowAddComponent(!showAddComponent)
    }
    console.log(showAddComponent)
    return(
        <>
            <Container fluid className="mx-auto" style={{ marginTop: "3vh" }}>
            <label
                style={{
                marginLeft: "3vw",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "2vh",
                }}>
                Projects <GrProjects />
            </label>
            <Container fluid className="mx-auto">
                <Container fluid className="mx-auto">
                <Accordion defaultActiveKey="0">
                {currentUser.Projects.map((project, index) => {
                    return (
                        <Accordion.Item
                        key={index} eventKey={index}>
                        <Accordion.Header>{project.name}</Accordion.Header>
                        <Accordion.Body>
                            {project.description}
                        </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
                </Accordion>
                {
                    showAddComponent
                    ?(
                        <AddComponent setAddComponent={setAddComponent} type={"project"}/>
                    )
                    :(
                        <p
                        style={{
                        fontFamily:'monospace', 
                        fontSize:'14px',
                        color:'#0d6efd',
                        cursor:'pointer',
                        marginTop:'1.5vh'
                        }}
                        onClick={()=>setShowAddComponent(true)}
                        >
                        <IoIosAdd />
                        Add Project
                        </p>
                    )
                }
                </Container>
            </Container>
            </Container>
        </>
    )
}