import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { MdDynamicFeed } from "react-icons/md";
import { Container, Tab, Tabs } from "react-bootstrap";
import UserPosts from "./userPosts";
import SubSelectedUserPosts from "./subSelectedUserPosts";


export default function SelectedUserPosts(props){
    return(
        <Container 
        fluid className="mx-auto"
        style={{ marginTop:'3vh', color: props.fontColor, backgroundColor: props.background }}>
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
                <MdDynamicFeed/>
            </label>
            <Container className="mx-auto">
                <Tabs>
                    <Tab eventKey="posts" title="Posts">
                        <SubSelectedUserPosts background={props.background} fontColor={props.fontColor} posts={props.posts}/>
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    )
}