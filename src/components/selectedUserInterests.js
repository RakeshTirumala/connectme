import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { MdOutlineInterests } from "react-icons/md";
import { Container } from "react-bootstrap";

export default function SelectedUserInterests(props) {
    return (
        <Container 
            fluid 
            className="mx-auto" 
            style={{ marginTop:'3vh', color: props.fontColor, backgroundColor: props.background }}>
            <label 
                style={{
                    marginLeft: "3vw",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "2vh",
                }}>
                Interests <MdOutlineInterests/>
            </label>
            <Container className="mx-auto" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {props.interests.map(interest => (
                    <div 
                        key={interest} 
                        style={{
                            borderRadius: '5rem',
                            height: '2rem',
                            width: '3rem',
                            marginRight: '1vw',
                            marginBottom: '1vh',
                            backgroundColor: props.background,
                            border: "0.5px solid lightgrey",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <label 
                            style={{
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                textAlign: 'left',
                                padding: '1vh'
                            }}>
                            {interest}
                        </label>
                    </div>
                ))}
            </Container>
        </Container>
    );
}
