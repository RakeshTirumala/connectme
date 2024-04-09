import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Modal, ListGroup, Row, Col} from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAltSolid } from "react-icons/lia";
import Stack from 'react-bootstrap/Stack';
import img from "../images/defaultPic.webp";
import { AiFillLike } from "react-icons/ai";
import StartCommentComponent from "./startCommentComponent";
 
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
    const [showCommentInp, setShowCommentInp] = useState(false);
    const [showLikesComments, setShowLikesComments] = useState(false)
    const [clickedOn, setClickedOn] = useState("");
    const [likedUsersOfCurrentActivityPost, setLikedUsersOfCurrentActivityPost] = useState([]);
    const [commentedUsersOfCurrentActivityPost, setCommentedUsersOfCurrentActivityPost] = useState([])

    const onClickLike=(id)=>{
        setLiked(!liked);
        setCurrentActivityPost(id)
    }

    const commentIncrementer=()=>{
        setComments(prev=>prev+=1);
    }

    const closeStartCommentComponent=()=>{
        setShowCommentInp(!showCommentInp)
    }

    const selectCommentHandler=(id)=>{
        setShowCommentInp(!showCommentInp)
        setCurrentActivityPost(id)
    }
    // console.log(currentActivityPost)

    useEffect(() => {
        if (mounted && currentActivityPost) {
            if (liked) {
                setLikes(prev => prev += 1);
            } else {
                if (likes > 0) setLikes(prev => prev -= 1);
            }
            updateLikesOfPostId();
        }
    }, [liked]);

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
        // console.log(response)
    }

    //FETCH LIKES OF A POST
    const fetchLikesOfPost=async()=>{
        const response = await fetch(`http://localhost:1111/api/feed/postActivity/likes?postId=${currentActivityPost}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
        })
        const {likedUsers} = await response.json();
        console.log("liked USers",likedUsers)
        setLikedUsersOfCurrentActivityPost(likedUsers)
    }

    // FETCH COMMENTS OF A POST 
    const fetchCommentsOfPost=async()=>{
        const response = await fetch(`http://localhost:1111/api/feed/postActivity/comments?postId=${currentActivityPost}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })
        const {commentedUsers} = await response.json();
        console.log("commentedUSers",commentedUsers)
        setCommentedUsersOfCurrentActivityPost(commentedUsers)

    }

    useEffect(()=>{
        if(currentActivityPost && clickedOn==="Likes") fetchLikesOfPost()

        if(currentActivityPost && clickedOn==="Comments") fetchCommentsOfPost()
    },[currentActivityPost, clickedOn])

    //HANDLE LIKES && COMMENTS
    const handleLikes=(id)=>{
        setCurrentActivityPost(id)
        setShowLikesComments(!showLikesComments)
        setClickedOn("Likes")

    }

    const handleComments=(id)=>{
        setCurrentActivityPost(id)
        setShowLikesComments(!showLikesComments)
        setClickedOn("Comments")
    }

    return(
        <>
        <Card key={props.id} 
        style={{marginTop:'2vh', marginBottom:'2vh',
         maxWidth: '800px', minWidth: '300px', width: '80vw'}}>
            <Card.Header style={{fontFamily:'fantasy', fontSize:'14px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div>
                    {new Date(props.date).toLocaleDateString('en-US', options)}
                </div>
                {
                    (props.connectionsLiked>0)
                    ?(<div>{props.connectionsLiked} of your connections liked this post</div>)
                    :(<></>)
                }
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
                            <div className="p-2" 
                            onClick={()=>handleLikes(props.id)} 
                            style={{cursor:"pointer"}}>{likes} Likes</div>
                            <div className="p-2 ms-auto" 
                            onClick={()=>handleComments(props.id)} 
                            style={{cursor:"pointer"}}> {comments} Comments</div>
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

                            <div className="p-2 ms-auto" style={{cursor:'pointer'}} onClick={()=>selectCommentHandler(props.id)}>
                                <LiaCommentAltSolid style={{margin:'.3em'}} size={15}/> 
                                Comment
                            </div>
                        </Stack>
                    </div>
            </Card.Footer>
            {
                showCommentInp && 
                <StartCommentComponent 
                    commentIncrementer={commentIncrementer} 
                    closeStartCommentComponent={closeStartCommentComponent}
                    currentActivityPost={currentActivityPost}
                    currentUser = {props.currentUser}
                /> 
            }
        </Card>
        <Modal show={showLikesComments} onHide={()=>setShowLikesComments(!showLikesComments)} size="md">
            <Modal.Header closeButton>
                <Modal.Title style={{fontSize:"16px", fontFamily:"fantasy"}}>{clickedOn}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (clickedOn==="Likes")
                    ?(
                        <ListGroup  style={{overflowY:'scroll'}}>
                            {
                                (likedUsersOfCurrentActivityPost.length>0)
                                ?(
                                    likedUsersOfCurrentActivityPost.map((user)=>{
                                        return(
                                            <ListGroup.Item key={user.email}>
                                                <Row>
                                                    <Col>
                                                        <Image src={img} roundedCircle style={{width:'2rem'}}/>
                                                    </Col>
                                                    <Col>
                                                        {user.firstName} {user.lastName}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })
                                )
                                :(
                                    <h5>No likes</h5>
                                )
                            }
                        </ListGroup>
                    )
                    :(
                        <ListGroup  style={{overflowY:'scroll'}}>
                            {
                                (commentedUsersOfCurrentActivityPost.length>0)
                                ?(
                                    commentedUsersOfCurrentActivityPost.map((user)=>{
                                        return(
                                            <ListGroup.Item key={user.email}>
                                                <Row>
                                                    <Col>
                                                        <Image src={img} roundedCircle style={{width:'2rem'}}/>
                                                    </Col>
                                                    <Col>
                                                        {user.firstName} {user.lastName}
                                                    </Col>
                                                    <Col style={{textAlign:"left", fontSize:'12px', fontFamily:'fantasy'}}> 
                                                        {user.data}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })
                                )
                                :(
                                    <h5>No Comments</h5>
                                )
                            }
                        </ListGroup>
                    )
                }
            </Modal.Body>
        </Modal>
        </>
    )
} 