import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Image, Card } from "react-bootstrap";
import img from "../images/defaultPic.webp";
// import { feedData } from "../data";
import PostComponent from "./postComponent";
import StartPostComponent from "./startPostComponent";
import noFeed from "../images/noFeed.svg";
// import { MdEmail } from "react-icons/md";

export default function FeedComponent() {
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

  useEffect(()=>{
    fetchFeed()
  },[])

  const fetchFeed = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPLORE_URL_DIGITAL_OCEAN}?currentUser=${currentUser}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
    <>
      <Container className="mx-auto">
        <Card
          style={{
            marginTop: "2vh",
            marginBottom: "2vh",
            maxWidth: "800px",
            minWidth: "300px",
            width: "80vw",
          }}
        >
          <Card.Body style={{ display: "flex" }}>
            <Image
              src={(!dp)?img:dp}
              roundedCircle
              style={{ width: "3rem", marginRight: "0.8rem" }}
            />
            <Button
              style={{
                textAlign: "left",
                backgroundColor: "transparent",
                borderColor: "#ccc",
                color: "#ccc",
                paddingLeft: "1.6rem",
                width: "90%",
              }}
              variant="secondary"
              size="lg"
              onClick={handleShow}
            >
              Share something...
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mx-auto" style={{ overflowY: "scroll", height:'100vh'}}>
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
                  dp={post.dp}
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
      />
    </>
  );
} 
 