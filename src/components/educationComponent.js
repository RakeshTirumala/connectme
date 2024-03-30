import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Accordion, Container } from "react-bootstrap";
import { IoSchoolOutline } from "react-icons/io5";
import SubEducationComponent from "./subEducationComponent";
import { IoIosAdd } from "react-icons/io";
import AddComponent from "./addComponent";
 
export default function EducationComponent() {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const storedEducation = JSON.parse(localStorage.getItem('Education'));
    if (storedEducation) {
      setEducation(storedEducation);
    }
  }, []);

  const setAddComponent = () => {
    setShowAddComponent(!showAddComponent);
  };

  const educationHandler = (data) => {
    setEducation(prev => [...prev, data]);
  };

  useEffect(() => {
    localStorage.setItem("Education", JSON.stringify(education));
  }, [education]);

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
            {education.length === 0 ? (
              <p style={{ marginLeft: '1vw' }}>Add Education!!!</p>
            ) : (
              education.map((edu, index) => {
                return (
                  <Accordion.Item
                    key={index}
                    eventKey={`${edu.startDate} ${edu.endDate}`}
                  >
                    <Accordion.Header>{edu.Degree}</Accordion.Header>
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
              })
            )}
          </Accordion>
          {showAddComponent ? (
            <AddComponent
              setAddComponent={setAddComponent}
              type={"education"}
              educationHandler={educationHandler}
            />
          ) : (
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#0d6efd',
                cursor: 'pointer',
                marginTop: '1.5vh'
              }}
              onClick={() => setShowAddComponent(true)}
            >
              <IoIosAdd />
              Add Education
            </p>
          )}
        </Container>
      </Container>
    </Container>
  );
}
