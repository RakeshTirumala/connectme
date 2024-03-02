import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAltSolid } from "react-icons/lia";

export default function PostComponent(props){
    return(
        <Card key={props.id} 
        style={{marginTop:'2vh', marginBottom:'2vh',
         maxWidth: '800px', minWidth: '300px', width: '80vw'}}>
            <Card.Body>
                <Card.Title style={{fontSize:'16px', fontWeight:'bold'}}>{props.postedBy}</Card.Title>
                <Card.Text>{props.post}</Card.Text>
            </Card.Body>
            <Card.Footer style={{display:'flex', flexDirection:'row', gap:'1vw'}}>
                <div><AiOutlineLike/> Like</div>
                <div><LiaCommentAltSolid /> Comment</div>
            </Card.Footer>
        </Card>
    )
}