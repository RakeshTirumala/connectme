import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Button, Container, Form } from "react-bootstrap";
import { MdOutlineInterests } from "react-icons/md";
import { lightTheme } from "../constants";

export default function InterestsComponent() {
    const [selectedInterests, setSelectedInterests] = useState([]);
    useEffect(() => {
        const storedInterests = JSON.parse(localStorage.getItem('interests'))
        setSelectedInterests(storedInterests || []); 
    }, []);

    const interests = [
        { id: "1", label: "Software Engineer", value: "SWE" },
        { id: "2", label: "Human Resources", value: "HR" },
        { id: "3", label: "Product Management", value: "PM" },
        { id: "4", label: "Marketing", value: "Markt" },
        { id: "5", label: "Finance", value: "Fin" },
        { id: "6", label: "Education", value: "Edu" }
    ];

    const handleCheckboxChange = (interest, isChecked) => {
        setSelectedInterests(isChecked ? [...selectedInterests, interest] : selectedInterests.filter(item => item !== interest));
    };

    const handleInterests = () => {
        localStorage.setItem('interests', JSON.stringify(selectedInterests));
    }

    return (
        <Container fluid className="mx-auto" style={{ marginTop: '3vh' }}>
            <label style={{
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
                                {selectedInterests.map(interest => (
                                    <div key={interest} style={{
                                        borderRadius: '5rem',
                                        height: '2rem',
                                        width: '3rem',
                                        marginRight: '1vw',
                                        backgroundColor: lightTheme,
                                        border: "0.5px solid black",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                    }}>
                                        <label style={{
                                            fontFamily: 'monospace',
                                            fontWeight: 'bold',
                                            justifyContent: "center",
                                            textAlign: 'left',
                                            padding: '1vh'
                                        }}>{interest}</label>
                                    </div>
                                ))}
                            </Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    {interests.map(({ id, label, value }) => (
                                        <Form.Check
                                            key={id}
                                            type="checkbox"
                                            id={id}
                                            label={label}
                                            checked={selectedInterests.includes(value)}
                                            onChange={(e) => handleCheckboxChange(value, e.target.checked)}
                                        />
                                    ))}
                                    <Button
                                        variant="primary"
                                        style={{ marginTop: '3vh', borderRadius: '5rem' }}
                                        onClick={() => handleInterests()}
                                    >
                                        Update
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </Container>
        </Container>
    )
}
