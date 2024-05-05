import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Container } from "react-bootstrap";

export default function SubSelectedUserPosts(props){
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
    };
    console.log(props.posts)
    return(
        <Container 
        style={{
            height:'50vh', overflowY:'scroll'}}>
            {
                props.posts.map((post)=>{
                    return(
                        <Card 
                        key={post._id}
                        style={{
                            margin:'1%', color:props.fontColor, 
                            backgroundColor:props.background, borderColor:'lightgrey'
                        }}>
                            <Card.Header                                     
                                style={{
                                    fontFamily:'sans-serif', fontSize:'14px', 
                                    borderStyle:'none',backgroundColor:props.background
                                }}>                                        
                                <div>
                                    {new Date(post.createdAt).toLocaleDateString('en-US', options)}
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {post.postData}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </Container>
    )
}
