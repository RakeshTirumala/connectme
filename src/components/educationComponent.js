import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Accordion, Container } from "react-bootstrap";
import { IoSchoolOutline } from "react-icons/io5";
import { currentUser } from "../data";
import SubEducationComponent from "./subEducationComponent";
import { IoIosAdd } from "react-icons/io";
import AddComponent from "./addComponent";

export default function EducationComponent() {

  const [showAddComponent, setShowAddComponent] = useState(false)

  const setAddComponent=()=>{
    setShowAddComponent(!showAddComponent)
  }
  console.log(showAddComponent)

  return (
    <Container fluid className="mx-auto" style={{ marginTop: "3vh" }}>
      <label
        style={{
          marginLeft: "3vw",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "2vh",
        }}
      >
        Education <IoSchoolOutline />
      </label>
      <Container fluid className="mx-auto">
        <Container fluid className="mx-auto">
          <Accordion defaultActiveKey="0">
            {currentUser.Education.map((edu, index) => {
              return (
                <Accordion.Item
                  key={index}
                  eventKey={`${edu.startDate} ${edu.endDate}`}
                >
                  <Accordion.Header>{edu.DegreeLevel}</Accordion.Header>
                  <Accordion.Body>
                    <SubEducationComponent
                      school={edu.schoolName}
                      start={edu.startDate}
                      end={edu.endDate}
                      conc={edu.Concentration}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
          {
            showAddComponent
            ?(
              <AddComponent setAddComponent={setAddComponent} type={"education"}/>
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
              Add Education
            </p>
            )
          }
        </Container>
      </Container>
    </Container>
  );
}
