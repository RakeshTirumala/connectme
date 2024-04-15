import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'emoji-picker-element';  
import { RiEmojiStickerLine } from "react-icons/ri";
import {Card, Form, Button} from 'react-bootstrap'

export default function StartCommentComponent(props){
    const [comment, setComment] = useState("");
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)

    useEffect(()=>{
        if(emojiPickerVisible){
          document.querySelector('emoji-picker')
          .addEventListener('emoji-click', event => setComment(prev=>prev+event.detail.unicode));
        }
      },[emojiPickerVisible])
    
    const handleCommentClick=async()=>{
        if(comment.trim()!==""){
            const currentUser = props.currentUser;
            const postId = props.currentActivityPost;
            const commentData = {
                userId:currentUser,
                data:comment
            }
            const response = await fetch(`${process.env.REACT_APP_EXPLORE_URL_DIGITAL_OCEAN}/postActivityComments`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({currentUser:currentUser, postId:postId, commentData:commentData})
            })

            if(response.ok){
                props.commentIncrementer();
                props.closeStartCommentComponent()
            }
        }
    }

    return(
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="feedtext">
                        <Form.Control
                        as="textarea"
                        value={comment}
                        placeholder="Comment..."
                        rows={3}
                        onChange={(e) => setComment(e.target.value)}
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
            </Card.Body>
            <Card.Footer>
                <div style={{float:'right', gap:'1vw', display:'flex'}}>
                    <Button variant="secondary" onClick={()=>props.closeStartCommentComponent()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>handleCommentClick()}>
                        Comment!
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}