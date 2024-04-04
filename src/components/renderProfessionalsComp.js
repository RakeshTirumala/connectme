import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { data } from "../data";
import img from '../images/defaultPic.webp';
import noDataa from '../images/noDataa.svg';

export default function RenderProfessionalsComp(props) {
    const [requestedMap, setRequestedMap] = useState({});
    const [content, setContent] = useState([]);
    const [professionalsData, setProfessionalsData] = useState([])
    let buttons = [];
    let i = 0;

    useEffect(() => {
        fetchProfessionalData();
    }, []);

    useEffect(()=>{
        handlePagination(0);
    },[content])

    

    const fetchProfessionalData = async () => {
        const response = await fetch(`http://localhost:1111/api/network/professionals?email=${props.email}&interests=${JSON.stringify(props.interests)}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });
        const responseData = await response.json();
        console.log("data:[professionals]", responseData.paginatedUsers);
        setContent(responseData.paginatedUsers);
    };

    const professionalData = data.filter(dp => {
        if (!props.searchQuery) return dp.professional === true;
        return dp.professional === true && (
            dp.firstName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
            dp.lastName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
            dp.bio.toLowerCase().includes(props.searchQuery.toLowerCase())
        );
    });

    const handleConnect = (email) => {
        setRequestedMap(prevMap => ({
            ...prevMap,
            [email]: true
        }));
    };


    const handlePagination=(page)=>{
        const pageContent = content[page]
        setProfessionalsData(pageContent)
      }
    
      console.log("professionals data", professionalsData)
    
      if(content.length>1){
        for(let i=0; i<content.length;i++){
          buttons.push(
            <Button value={i+1} key={i+1} onClick={()=>handlePagination(i)}>{i+1}</Button>
          )
        }
      }

    return (
        <>
            <Container fluid className="mx-auto">
                {
                    (!professionalsData)
                        ? (
                        <center>
                                <Image src={noDataa} style={{ width: '12rem', margin:'10%'}} />
                        </center>
                        )
                        : (
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {
                                    professionalsData.map((item) => (
                                        <Col key={item.email}>
                                            <Card style={{ width: '18rem' }} id="profID">
                                                <Image src={img} style={{ width: '8rem', padding: '0.5rem' }} roundedCircle />
                                                <Card.Body>
                                                    <Card.Title>{item.firstName} {item.lastName}</Card.Title>
                                                    <Card.Text>
                                                        {item.bio}
                                                    </Card.Text>
                                                    <Button variant="primary" onClick={() => handleConnect(item.email)}>
                                                        {requestedMap[item.email] ? 'Requested!' : 'Connect'}
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                        )
                }
            </Container>
            <center>
                <Container fluid className="mx-auto">
                    {buttons}
                </Container>
            </center>
        </>
    );
}
