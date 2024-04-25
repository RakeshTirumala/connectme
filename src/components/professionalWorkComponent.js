  import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Accordion, Container } from "react-bootstrap";
import { MdOutlineWorkOutline } from "react-icons/md";
import { currentUser } from "../data";
import SubProfessionalWork from "./subProfessionWork";
import { IoIosAdd } from "react-icons/io";
import AddComponent from "./addComponent";

export default function ProfessionalWorkComponent(props) {
  const [showAddComponent, setShowAddComponent] = useState(false)
  const [professional, setProfessional] = useState([])

  useEffect(()=>{
    const storedWorkExperience = JSON.parse(localStorage.getItem('workExperience'));
    if(storedWorkExperience) setProfessional(storedWorkExperience)
  },[])

  const setAddComponent=()=>{
    setShowAddComponent(!showAddComponent)
  }
  // console.log(showAddComponent)

  const professionalHandler=(data)=>{
    setProfessional(prev=>[...prev, data])
  }

  useEffect(()=>{
    localStorage.setItem("workExperience", JSON.stringify(professional));
  },[professional])

  return (
    <Container fluid className="mx-auto" style={{ marginTop: "3vh", color:props.fontColor}}>
      <label
        style={{
          marginLeft: "3vw",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "2vh",
        }}
      >
        Professional work <MdOutlineWorkOutline />
      </label>
      <Container fluid className="mx-auto">
        <Container fluid className="mx-auto">
          <Accordion defaultActiveKey="0">
            {
              (professional.length===0)
              ?(
                <p style={{marginLeft:'1vw'}}>Add Professional Experience!!!</p>
              )
              :(
                professional.map((work, index) => {
                  return (
                    <Accordion.Item
                      key={index}
                      eventKey={`${work.startDate} ${work.endDate}`}
                    >
                      <Accordion.Header>{work.role}</Accordion.Header>
                      <Accordion.Body>
                        <SubProfessionalWork
                          start={work.startDate}
                          end={work.endDate}
                          company={work.company}
                          description={work.description}
                        /> 
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })
              )
            }
            {/* {currentUser.WorkExperience.map((work, index) => {
              return (
                <Accordion.Item
                  key={index}
                  eventKey={`${work.startDate} ${work.endDate}`}
                >
                  <Accordion.Header>{work.role}</Accordion.Header>
                  <Accordion.Body>
                    <SubProfessionalWork
                      start={work.startDate}
                      end={work.endDate}
                      company={work.company}
                      description={work.description}
                    />
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
              type={"professional"} 
              professionalHandler={professionalHandler}
              />
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
              Add Work
            </p>
            )
          }
        </Container>
      </Container>
    </Container>
  );
}
