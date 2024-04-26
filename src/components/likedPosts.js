import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container, Image } from "react-bootstrap";
import nullIm from '../images/null.svg';


export default function LikedPosts(props){
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
    };
    return(
        (props.likedPosts.length===0)
        ?(
            <center style={{padding:'5%'}}>
                <Image src={nullIm} style={{width:'8rem',  transform: 'scaleX(-1)'}}/>
                <p style={{color:'grey', fontFamily:'monospace'}}>No Liked posts...</p>
            </center>
        )
        :(
            <Container style={{height:'50vh', overflowY:'scroll', }}>
                {
                    props.likedPosts.map((post)=>{
                        return(
                            <Card key={post._id} 
                            style={{
                                margin:'1%', backgroundColor:props.background, 
                                color:props.fontColor, borderColor:'lightgrey'}}>
                                    <Card.Header 
                                    style={{fontFamily:'fantasy', fontSize:'14px', 
                                    display:'flex', flexDirection:'row', 
                                    justifyContent:'space-between', borderStyle:'none',
                                    backgroundColor:props.background
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
                                <Card.Footer 
                                style={{
                                    display:'flex', flexDirection:'row', 
                                    gap:'1vw', borderStyle:'none',
                                    backgroundColor:props.background
                                    }}>
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