import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Image, Card } from "react-bootstrap";
import img from "../images/defaultPic.webp";
// import { feedData } from "../data";
import PostComponent from "./postComponent";
import StartPostComponent from "./startPostComponent";
import noFeed from "../images/noFeed.svg";
// import { MdEmail } from "react-icons/md";

export default function FeedComponent(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [feed, setFeed] = useState([])

  const fn = localStorage.getItem('firstName');
  const ln = localStorage.getItem('lastName');
  const currentUser = localStorage.getItem('email')
  const dp = localStorage.getItem('dp')
  // console.log("dp", dp)
  // console.log("current", currentUser)

  console.log("bg",props.background,"fontC", props.fontColor)

  useEffect(()=>{
    fetchFeed()
  },[])

  const fetchFeed = async () => {
    // process.env.REACT_APP_EXPLORE_URL_DIGITAL_OCEAN
    // http://localhost:1111/api/feed
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPLORE_URL_DIGITAL_OCEAN}?currentUser=${currentUser}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials:'include'
      });
  
      if (!response.ok) {
        // Handle non-successful responses (e.g., 404, 500)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if(response.ok){
        const { feed } = await response.json();
        setFeed(feed);
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };
  

  const fullName = `${fn} ${ln}`;

  console.log(feed)

  const addDataToFeed=(data)=>{
    const newFeed = [data, ...feed];
    setFeed(newFeed);
  }

  // useEffect(()=>{
  //   setFeed(feed)
  // },[feed])

 

  return (
    <Container fluid style={{
      backgroundColor: props.background, paddingTop:'2vh', fontFamily:"monospace", minHeight:'100vh'}}>

      <Container className="mx-auto">
        <Card
          style={{
            marginBottom: "2vh",
            maxWidth: "800px",
            minWidth: "300px",
            width: "80vw",
            backgroundColor:props.background,
            borderColor:'lightgrey',
          }}
        >
          <Card.Body style={{ display: "flex" }}>
          <Image
            src={!dp ? img : dp}
            roundedCircle
            style={{ 
              width: "100%", 
              maxWidth: "2.5rem", 
              height: "auto", 
              maxHeight: "3rem",
              marginRight:'0.5vw'
            }}
          />

          <Button
            style={{
              textAlign: "left",
              backgroundColor: "transparent",
              borderColor: "#ccc",
              color: "#ccc",
              paddingLeft: "1.6rem",
              width: "100%", 
              fontSize:'10px'
            }}
            variant="secondary"
            size="lg"
            onClick={handleShow}
          >
            Post your thoughts... 
          </Button>

          </Card.Body>
        </Card>
      </Container>

      <Container className="mx-auto" style={{overflowY:'scroll'}}>
        {
          (feed.length>0)
          ?(
            feed
            .map((post) => {
              return (
                <PostComponent
                  key={post.id}
                  post={post.postData}
                  postedBy={post.fullNameOfPoster}
                  id={post.id}
                  date={post.timeOfCreation}
                  likes = {post.likes}
                  comments = {post.comments}
                  currentUserLiked={post.currentUserLiked}
                  currentUser={currentUser}
                  connectionsLiked={post.connectionsLiked}
                  connectionsCommented={post.connectionsCommented}
                  dp={post.dp}
                  background={props.background}
                  fontColor={props.fontColor}
                />
              );
            })
          )
          :(
            <center>
              <Image src={noFeed} style={{width:"15rem"}}/>
              <p style={{color:'grey', fontFamily:'monospace'}}>No feed!</p>
            </center>
          )
        }
      </Container>
      <StartPostComponent
        feed={feed}
        show={show}
        handleInput={handleClose}
        handleClose={handleClose}
        fullName = {fullName}
        currentUser={currentUser}
        addDataToFeed={addDataToFeed}
        background={props.background}
        fontColor={props.fontColor}
      />
    </Container>
  );
} 
 