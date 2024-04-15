import React from "react";
import { Badge, Col, Image, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import "bootstrap/dist/css/bootstrap.css";

export default function MessengerAccountsComponent(props) {
  return (
    <>
      <Image
        src={(!props.dp)?img:props.dp}
        style={{ width: "4rem", padding: "0.5rem" }}
        roundedCircle
      />
      <div className="ms me-auto" style={{ padding: ".5rem" }}>
        <div className="fw-bold">{props.connectionFirstname} {props.connectionLastName}</div>
        <div className="ms me-auto" style={{marginTop:'0.5vh'}}>
          <p style={{ fontFamily: 'monospace', color: 'grey', fontSize: '12px' }}>{props.latestMsgInConvo}</p>
        </div>
      </div>
    </>
  );
}
