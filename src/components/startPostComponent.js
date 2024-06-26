import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import 'emoji-picker-element';  
import { RiEmojiStickerLine } from "react-icons/ri";
import '../App.css';
 
export default function StartPostComponent(props) {
  const [post, setPost] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const email = localStorage.getItem('email')
  const [localFeed, SetLocalFeed]= useState([]);
  const [emojiPickerTheme, setEmojiPickerTheme] = useState("light");

  useEffect(()=>{
    (props.fontColor==="white")?setEmojiPickerTheme('dark'):setEmojiPickerTheme('light')
  },[props.fontColor])


  const postToDb=async()=>{
    const response = await fetch(process.env.REACT_APP_EXPLORE_URL_DIGITAL_OCEAN,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      credentials:'include',
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
    <Modal show={props.show} onHide={props.handleClose} >
      <Modal.Header closeButton style={{backgroundColor:props.background, color:props.fontColor}}>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:props.background}}>
        <Form>
          <Form.Group className="mb-3" controlId="feedtext">
            <Form.Control
              className={(props.background)?"darkPlaceholder":"lightPlaceholder"} 
              as="textarea"
              value={post}
              placeholder="Start a post"
              rows={3}
              onChange={(e) => setPost(e.target.value)}
              style={{ boxShadow: "none", 
              backgroundColor:props.background,
              color:props.fontColor,  
            }}
            />
            <RiEmojiStickerLine 
            style={{cursor:'pointer', float:'right', margin:'2%', color:props.fontColor}} 
            size={18}
            onClick={()=>setEmojiPickerVisible(!emojiPickerVisible)}
            />
          </Form.Group>
        </Form>
        {
          emojiPickerVisible && (
            <div>
              <emoji-picker class={emojiPickerTheme} style={{width:'80%'}}></emoji-picker>
            </div>
          )
        }
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:props.background}}>
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
