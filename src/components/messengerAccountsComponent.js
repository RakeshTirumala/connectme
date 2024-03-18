import React from "react";
import { Badge, Image } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import "bootstrap/dist/css/bootstrap.css";

export default function MessengerAccountsComponent(props) {
  return (
    <>
      <Image
        src={img}
        style={{ width: "5rem", padding: "0.5rem" }}
        roundedCircle
      />
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.connection}</div>
        Cras justo odio
      </div>
      <Badge bg="primary" pill>
        14
      </Badge>
    </>
  );
}
