import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import 'emoji-picker-element';  
import { RiEmojiStickerLine } from "react-icons/ri";
 
export default function StartPostComponent(props) {
  const [post, setPost] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const email = localStorage.getItem('email')
  const [localFeed, SetLocalFeed]= useState([]);


  const postToDb=async()=>{
    const response = await fetch(process.env.REACT_APP_EXPLORE_URL_DIGITAL_OCEAN,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({currentUser:email, post:post})
    })
    console.log(response)
    if(response.ok){
      console.log("post inserted to the db");
      const data = {
        id: props.feed.length + 1,
        postData:post,
        likes:0,
        comments:0,
        fullNameOfPoster:props.fullName,
        email:props.currentUser,
        timeOfCreation:new Date(),
        currentUserLiked:false
      }
      props.addDataToFeed(data)
      console.log(props.feed)
    }else{
      console.log("failed to insert!")
    }
  }



  const handlePost = () => {
    if(post.trim()!==""){
      postToDb();
      setPost("")
    }
    props.handleClose();
  };

  useEffect(()=>{
    if(emojiPickerVisible){
      document.querySelector('emoji-picker')
      .addEventListener('emoji-click', event => setPost(prev=>prev+event.detail.unicode));
    }
  },[emojiPickerVisible])

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="feedtext">
            <Form.Control
              as="textarea"
              value={post}
              placeholder="Start a post"
              rows={3}
              onChange={(e) => setPost(e.target.value)}
              style={{ boxShadow: "none" }}
            />
            <RiEmojiStickerLine 
            style={{cursor:'pointer', float:'right', margin:'2%'}} 
            size={18}
            onClick={()=>setEmojiPickerVisible(!emojiPickerVisible)}
            />
          </Form.Group>
        </Form>
        {
          emojiPickerVisible && (
            <div>
              <emoji-picker class="light" style={{width:'80%'}}></emoji-picker>
            </div>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>handlePost()}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
