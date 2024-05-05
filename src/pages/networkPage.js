import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Button,Container,Form,Col,FormControl,Row,Tab,Tabs, Image} from "react-bootstrap";
import NavbarComponent from "../components/navbarComponent";
import { FaSearch } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import RenderProfessionalsComp from "../components/renderProfessionalsComp";
import RenderStudentComponent from "../components/renderStudentsComponent";
import MyConnectionsComponent from "../components/myConnectionsComponent";
import RequestsComponent from "../components/requestsComponent";
import SearchQueryResults from "../components/searchQueryResults";
import noDataa from '../images/noDataa.svg';

export default function NetworkPage(props) {
  const [key, setKey] = useState("professionals");
  const [searchQuery, setSearchQuery] = useState("");
  const [connection, setUserConnection] = useState([]);
  const currentUseremail = localStorage.getItem("email");
  const interests = JSON.parse(localStorage.getItem('interests'))
  const [requestsLength, setRequestsLength] = useState(0);
  const [searchResult, setSearchResult] = useState([]);

  console.log(interests)

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRequestsLength=(data)=>{
    if(data) setRequestsLength(data);        
  }

  useEffect(()=>{
    if(searchQuery.trim()!=="") handleSearch()
  },[searchQuery])


  const handleSearch=async()=>{
    if(searchQuery.trim()!==""){
      // console.log(searchQuery)
      try{
        const response = await fetch(
          `${process.env.REACT_APP_NETWORK_URL_DIGITAL_OCEAN}/searchQuery?name=${searchQuery}&currentUser=${currentUseremail}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
          })
        const users = await response.json();
        setSearchResult(users);
        
      }catch(error){
        console.log(error)
      }
    }
  }


  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL_DIGITAL_OCEAN}/getUserConnections?email=${currentUseremail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const { users } = await response.json();
      console.log("connections",users)
      setUserConnection(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onKeyPressCustom=(event)=>{
    if(event.key==='Enter') handleSearch()
  }


  return (
    <>
      <NavbarComponent 
        background={props.background} 
        fontColor={props.fontColor} 
        themeData={props.themeData}
      />
      <Container
        fluid
        className="mx-auto"
        style={{paddingTop:'2vh',backgroundColor: props.background, minHeight:'100vh'}}
      >
        <Row className="justify-content-center mb-3">
          <Col xs={12} sm={8} md={6}>
            <Form>
              <div className="d-flex" style={{ gap: "2%" }}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-2 rounded-pill flex-grow-1"
                  style={{ boxShadow: "none", 
                  background:props.background, 
                  color:props.fontColor, 
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(event)=>onKeyPressCustom(event)}
                />
                <Button className="rounded-pill" onClick={()=>handleSearch()}>
                  <FaSearch />
                </Button>
                <DropdownButton id="dropdown-basic-button" title="Interests">
                  {
                    interests.map((interest)=>{
                      return(
                        <Dropdown.Item key={interest}>{interest}</Dropdown.Item>
                      )
                    })
                  }
                  {/* <Dropdown.Item>Software Engineering</Dropdown.Item>
                  <Dropdown.Item>Technology</Dropdown.Item>
                  <Dropdown.Item>Something else</Dropdown.Item> */}

                </DropdownButton>
              </div>
            </Form>
          </Col>
        </Row>
        <Container fluid className="mx-auto" style={{ paddingLeft: "5%" }}>
          {
            (!searchResult || !searchQuery)
            ?(
              <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3">
              <Tab eventKey="professionals" title="Professionals">
                <RenderProfessionalsComp  interests={interests} 
                email={currentUseremail} background={props.background} fontColor={props.fontColor}/>
              </Tab>
              <Tab eventKey="students" title="Students">
                <RenderStudentComponent  interests={interests} 
                email={currentUseremail} background={props.background} fontColor={props.fontColor}/>
              </Tab>
              <Tab eventKey="connections" title="Connections">
                <MyConnectionsComponent connections={connection} background={props.background} fontColor={props.fontColor}/>
              </Tab>
              <Tab eventKey="Requests" 
              title={<span>Requests 
              <span style={{backgroundColor: 'red', color: 'white', 
                paddingLeft:'.35rem', paddingRight:'.35rem', 
                paddingTop:'.03rem', paddingBottom:'.03rem', 
                margin:'.3rem', borderRadius:'50%', fontSize:'12px'}}>{requestsLength}</span></span>}>
                <RequestsComponent email={currentUseremail} 
                handleRequestsLength={handleRequestsLength} 
                background={props.background}
                fontColor={props.fontColor}
                />
              </Tab>
            </Tabs>
            )
            :(
              (searchResult.length>0)
              ?(
                <SearchQueryResults  
                searchResult={searchResult} background={props.background} 
                fontColor={props.fontColor} currentUser={currentUseremail}/>
              )
              :(
                <center>
                  <Image src={noDataa} style={{ width: '12rem', margin:'10%'}} />
                </center>
              )
            )
          }
        </Container>
      </Container>
    </>
  );
}
