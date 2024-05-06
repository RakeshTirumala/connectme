import React, { useEffect, useReducer, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container, Image, Row } from "react-bootstrap";
import nullIm from '../images/null.svg';
import { MdDeleteOutline } from "react-icons/md";

export default function UserPosts(props){
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
    };

    const [posts, setPosts] = useState(props.posts);

    useEffect(()=>{
        setPosts(props.posts)

    },[props.posts])

    const handleDeletionOfPost=async(id)=>{
        const items = posts.filter(item=>item._id!==id);
        setPosts(items)
        localStorage.setItem('posts', JSON.stringify(items))

        try{
            const response = await fetch(`${process.env.REACT_APP_PROFILE_URL_DIGITAL_OCEAN}?postId=${id}`, {
                method:'DELETE',
                headers:{"Content-Type":"application/json"},
                credentials:'include',
            })
            console.log(response)
        }catch(error){
            console.log(error)
        }
        
    }


    return(
        (posts.length===0)
        ?(
            <center style={{padding:'5%'}}>
                <Image src={nullIm} style={{width:'8rem',  transform: 'scaleX(-1)'}}/>
                <p style={{color:'grey', fontFamily:'sans-serif'}}>No posts...</p>
            </center>
        )
        :(
            <Container style={{height:'50vh', overflowY:'scroll'}}>
                {
                    posts.map((post)=>{
                        return(
                            <Card key={post._id} 
                            style={{
                                margin:'1%', color:props.fontColor, 
                                backgroundColor:props.background, borderColor:'lightgrey'
                                }}>
                                    <Card.Header 
                                    style={{
                                        fontFamily:'sans-serif', fontSize:'14px', 
                                        display:'flex', flexDirection:'row', 
                                        justifyContent:'space-between', borderStyle:'none',
                                        backgroundColor:props.background
                                        }}>
                                        <div>
                                            {new Date(post.createdAt).toLocaleDateString('en-US', options)}
                                        </div>
                                        <div>
                                            <MdDeleteOutline style={{cursor:'pointer'}} onClick={()=>handleDeletionOfPost(post._id)}/>
                                        </div>
                                    </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {post.postData}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer 
                                style={{
                                    display:'flex', flexDirection:'row',
                                    gap:'1vw', borderStyle:'none',
                                    backgroundColor:props.background}}>
                                    <div>
                                        {post.likes.length} likes
                                    </div>
                                    <div>
                                        {post.comments.length} comments
                                    </div>
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </Container>
        )
    )
}