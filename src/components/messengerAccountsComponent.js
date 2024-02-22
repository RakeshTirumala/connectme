import React from "react";
import { Badge, Image, ListGroup } from "react-bootstrap";
import img from '../images/defaultPic.webp';
import 'bootstrap/dist/css/bootstrap.css';

export default function MessengerAccountsComponent(props){
    return(
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            style={{display:'flex', flexDirection:'row', cursor:'pointer'}}
            >
            <Image src={img} style={{ width: '5rem', padding:'0.5rem'}} roundedCircle />
            <div className="ms-2 me-auto">
                < div className="fw-bold">{props.connectionName}</div>
                Cras justo odio
            </div>
        <Badge bg="primary" pill>14</Badge>
        </ListGroup.Item>
    )
}