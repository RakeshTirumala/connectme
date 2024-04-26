import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Tab, Tabs } from "react-bootstrap";
import { MdDynamicFeed } from "react-icons/md";
import UserPosts from "./userPosts";
import LikedPosts from "./likedPosts";
import CommentedPosts from "./commentedPosts";


export default function UserActivityComponent(props){
    const [liked, setLiked] = useState([]);
    const [commented, setCommented] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(()=>{
        setLiked(JSON.parse(localStorage.getItem('liked')))
        setCommented(JSON.parse(localStorage.getItem('commented')))
        setPosts(JSON.parse(localStorage.getItem('posts')))
    },[])

    console.log("liked",liked, "commented",commented, "posts",posts)
    
    return(
        <Container fluid className="mx-auto" style={{ marginTop: "3vh"}}>
            <label
                style={{
                    marginLeft: "3vw",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "2vh",
                    color:props.fontColor
                }}
            >
                Activity
                <MdDynamicFeed />
            </label>
            <Container className="mx-auto">
                <Tabs>
                    <Tab eventKey="posts" title="Posts">
                        <UserPosts posts={posts} background={props.background} fontColor={props.fontColor}/>
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    )
}