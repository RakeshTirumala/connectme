import React from "react";
import { data } from "../data";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import img from '../images/defaultPic.webp';

export default function RenderStudentComponent(){
    const studentData = data.filter(dp=>dp.professional===false);
    return(
        <Row xs={1} md={2} lg={3} className="g-4">
            {
                studentData.map((item)=>(
                    <Col key={item.email}>
                        <Card style={{ width: '18rem' }}>
                            <Image src={img} style={{ width: '8rem', padding:'0.5rem'}} roundedCircle />
                            <Card.Body>
                                <Card.Title>{item.firstName} {item.lastName}</Card.Title>
                                <Card.Text>
                                    {item.bio}
                                </Card.Text>
                                <Button variant="primary">Connect</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}