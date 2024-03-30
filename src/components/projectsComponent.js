import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { GrProjects } from "react-icons/gr";
import { Accordion, Container } from "react-bootstrap";
import { currentUser } from "../data";
import { IoIosAdd } from "react-icons/io";
import AddComponent from "./addComponent";

export default function ProjectsComponent(){
    const [showAddComponent, setShowAddComponent] = useState(false)
    const [projects, setProjects] = useState([])

    const setAddComponent=()=>{
      setShowAddComponent(!showAddComponent)
    }
    // console.log(showAddComponent)
    useEffect(()=>{
        const storedProjects = JSON.parse(localStorage.getItem('projects'))
        if(storedProjects) setProjects(storedProjects)
    },[])

    const projectsHandler=(data)=>{
        setProjects(prev=>[...prev, data])
    }

    useEffect(()=>{
        localStorage.setItem('projects', JSON.stringify(projects))
    },[projects])

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
                {
                   (projects.length===0)
                   ?(
                    <p style={{marginLeft:'1vw'}}>Add projects!!!</p>
                   )
                   :(
                    projects.map((project, index) => {
                        return (
                            <Accordion.Item
                            key={index} eventKey={index}>
                            <Accordion.Header>{project.projectTitle}</Accordion.Header>
                            <Accordion.Body>
                                {project.description}
                            </Accordion.Body>
                            </Accordion.Item>
                        );
                    })
                   ) 
                }
                {/* {currentUser.Projects.map((project, index) => {
                    return (
                        <Accordion.Item
                        key={index} eventKey={index}>
                        <Accordion.Header>{project.name}</Accordion.Header>
                        <Accordion.Body>
                            {project.description}
                        </Accordion.Body>
                        </Accordion.Item>
                    );
                })} */}
                </Accordion>
                {
                    showAddComponent
                    ?(
                        <AddComponent 
                        setAddComponent={setAddComponent} 
                        type={"project"} 
                        projectsHandler={projectsHandler}/>
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