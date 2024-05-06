import React, { useEffect, useState } from "react";
// import { data } from "../data";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import img from "../images/defaultPic.webp";
import noDataa from '../images/noDataa.svg'
import { useNavigate} from "react-router-dom";

export default function RenderStudentComponent(props) {
  const [requested, setRequested] = useState(new Set());
  const [content, setContent] = useState([]);
  const [studentsData, setStudentsData] = useState([]) 
  const currentUser = localStorage.getItem('email');
  const navigate = useNavigate();

  let buttons = []

  // const studentData = data.filter((dp) => {
  //   if (!props.searchQuery) return dp.professional === false;
  //   return (
  //     dp.professional === false &&
  //     (dp.firstName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
  //       dp.lastName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
  //       dp.bio.toLowerCase().includes(props.searchQuery.toLowerCase()))
  //   );
  // });

  useEffect(()=>{
    fetchStudentData()
  },[])

  useEffect(()=>{
    handlePagination(0)
    // console.log("hey just trying",studentsData)
  },[content])

  useEffect(()=>{
    if(studentsData){
      console.log("students", new Set(studentsData))
      studentsData.forEach((dp)=>{
        if(new Set(dp.Requests).has(currentUser)){
          console.log(new Set(dp.Requests).has(currentUser))
          const newSet = new Set(requested);
          newSet.add(dp.email);
          setRequested(newSet)
        }
      })
    }
  },[studentsData])


  const fetchStudentData=async()=>{
    const response = await fetch(`${process.env.REACT_APP_NETWORK_URL_DIGITAL_OCEAN}/students?email=${props.email}&interests=${JSON.stringify(props.interests)}`,{
      method:'GET',
      headers: { "Content-Type": "application/json" },
      credentials:'include'
    })
    console.log(response);
    const data = await response.json();
    console.log("data:[Students]",data.paginatedUsers)
    setContent(data.paginatedUsers)
    // console.log("Students Content",content)
  }

  const handleConnect = async(email) => {
    try{
      const response = await fetch(`${process.env.REACT_APP_NETWORK_URL_DIGITAL_OCEAN}/requests`,{
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        credentials:'include',
        body:JSON.stringify({currentUser:props.email, targetUser:email})
      })
      if(response.ok){
        let past = new Set(requested);
        past.add(email)
        setRequested(past)
      }
    }catch(error){
      alert(error)
    }
  };


  const handlePagination=(page)=>{
    const pageContent = content[page]
    setStudentsData(pageContent)
  }

  const handleProfileRoute=(email)=>{
    navigate('/user', {state:{email:email}})
  }

  console.log("studentsData",studentsData)

  if(content.length>1){
    for(let i=0; i<content.length;i++){
      buttons.push(
        <Button value={i+1} key={i+1} style={{margin:'0.1%'}} onClick={()=>handlePagination(i)}>{i+1}</Button>
      )
    }
  }

  return (
    <>
    <Container fluid className="mx-auto" style={{minHeight:'60vh'}}>
      {
        (!studentsData)
        ?(
          <center>
            <Image src={noDataa} style={{ width: '12rem', margin:'10%'}} />
          </center>
        )
        :(
          <Row xs={1} md={2} lg={3} className="g-4">
          {
            studentsData.map((item) => (
              <Col key={item.email}>
                <Card 
                style={{ 
                width: "18rem", backgroundColor:props.background, 
                color:props.fontColor, cursor:'pointer'}}
                >
                  <Image
                    src={(!item.dp)?img:item.dp}
                    style={{ width: "8rem", padding: "0.5rem" }}
                    roundedCircle
                    onClick={()=>handleProfileRoute(item.email)}
                  />
                  <Card.Body>
                    <Card.Title onClick={()=>handleProfileRoute(item.email)}>
                      {item.firstName} {item.lastName}
                    </Card.Title>
                    <Card.Text onClick={()=>handleProfileRoute(item.email)}>
                      Interests: {item.Interests.join(" • ")}
                    </Card.Text>
                      {
                        (requested.has(item.email))
                        ?(
                            <Button variant="primary" disabled={true}>Requested!</Button>
                        )
                        :(
                            <Button variant="primary" onClick={()=>handleConnect(item.email)}>
                            Connect
                            </Button>
                        )
                      }
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
