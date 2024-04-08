import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image} from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAltSolid } from "react-icons/lia";
import Stack from 'react-bootstrap/Stack';
import img from "../images/defaultPic.webp";
import { AiFillLike } from "react-icons/ai";

export default function PostComponent(props){
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
    };
    const [liked, setLiked] = useState(props.currentUserLiked)
    const [likes, setLikes] = useState(props.likes)
    const [comments, setComments] = useState(props.comments)
    const [currentActivityPost, setCurrentActivityPost] = useState("");
    const [mounted, setMounted] = useState(false); 

    const onClickLike=(id)=>{
        setLiked(!liked);
        setCurrentActivityPost(id)
    }

    useEffect(() => {
        if (mounted && currentActivityPost !== null) {
            if (liked) {
                setLikes(prev => prev += 1);
            } else {
                if (likes > 0) setLikes(prev => prev -= 1);
            }
            updateLikesOfPostId();
        }
    }, [liked, currentActivityPost]);

    useEffect(() => {
        setMounted(true); 
    }, []);

    // UPDATE LIKES ARRAY OF THE POST
    const updateLikesOfPostId=async()=>{
        const response = await fetch('http://localhost:1111/api/feed/postActivity',{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({currentUser:props.currentUser, postId:currentActivityPost, shouldIAddUserLike:liked})
        })
        console.log(response)
    }

    return(
        <Card key={props.id} 
        style={{marginTop:'2vh', marginBottom:'2vh',
         maxWidth: '800px', minWidth: '300px', width: '80vw'}}>
            <Card.Header style={{fontFamily:'fantasy', fontSize:'14px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                {
                    (props.connectionsLiked>0)
                    ?(<div>{props.connectionsLiked} of your connections liked this post</div>)
                    :(<></>)
                }
                <div>
                    {new Date(props.date).toLocaleDateString('en-US', options)}
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{fontSize:'16px', fontWeight:'bold'}}>
                    <Image src={img} roundedCircle style={{ width: "1.8rem", marginRight: "0.8rem" }}/>
                    {props.postedBy}
                </Card.Title>
                <Card.Text style={{fontFamily:'fantasy'}}>{props.post}</Card.Text>
            </Card.Body>
            <Card.Footer style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Stack direction="horizontal" gap={2} style={{fontFamily:'fantasy', fontSize:'14px'}}>
                            <div className="p-2">{likes} Likes</div>
                            <div className="p-2 ms-auto"> {comments} Comments</div>
                        </Stack>
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Stack direction="horizontal" gap={2} style={{fontFamily:'fantasy', fontSize:'14px'}}>
                            <div className="p-2" style={{cursor:'pointer'}} onClick={()=>onClickLike(props.id)}>
                                {
                                    (liked)
                                    ?(
                                        <AiFillLike color="#0080FF" style={{margin:'.3em'}} size={15}/>
                                    )
                                    :(
                                        <AiOutlineLike style={{margin:'.3em'}} size={15}/>
                                    )
                                }

                                Like
                            </div>

                            <div className="p-2 ms-auto" style={{cursor:'pointer'}}>
                                <LiaCommentAltSolid style={{margin:'.3em'}} size={15}/> 
                                Comment
                            </div>
                        </Stack>
                    </div>
            </Card.Footer>
        </Card>
    )
} 