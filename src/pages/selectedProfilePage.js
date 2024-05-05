import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "../components/navbarComponent";
import { useLocation } from "react-router-dom";
import SelectedUserDpComponent from "../components/selectedUserDpComponent";
import SelectedUserEducation from "../components/selectedUserEducation";
import SelectedUserProfession from "../components/selectedUserProfession";
import SelectedUserProjects from "../components/selectedUserProjects";
import SelectedUserInterests from "../components/selectedUserInterests";
import SelectedUserPosts from "../components/selectedUserPosts";


export default function SelectedProfilePage(props){
    const location = useLocation();
    const {email} = location.state
    // console.log("selected user", email)
    const [userData, setUserData] = useState({});
    const [selectedUserPosts, setSelectedUserPosts] = useState([]);
    const currentUser = localStorage.getItem('email');

    const fetchDetailsOfSelectedProfile=async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_USER_URL_DIGITAL_OCEAN}/selectedProfile?selectedProfile=${email}`, {
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            if(response.ok){
                const {selectedUserData, posts} = await response.json();
                // console.log(selectedUserData);
                if(selectedUserData) setUserData(selectedUserData);
                if(posts) setSelectedUserPosts(posts);
            }
        }catch(error){
            console.log("Failed to fetch data", error)
            alert("Failed to fetch the data");
        }
    }

    useEffect(()=>{
        fetchDetailsOfSelectedProfile();
    },[])

    return(
        <div style={{backgroundColor:props.background, minHeight:'100vh'}}>
            <NavbarComponent 
                background={props.background} fontColor={props.fontColor} 
                themeData={props.themeData}
            />
            <SelectedUserDpComponent 
                dp={userData.dp} background={props.background} 
                fontColor={props.fontColor} themeData={props.themeData}
                userType={userData.userType} connections={userData.Connections}
                interests={userData.Interests} firstName={userData.firstName}
                lastName={userData.lastName} mobile={userData.mobile}
                email={userData.email} posts={userData.posted}
                currentUser={currentUser} requests={userData.Requests}
            />
            {
                (userData.Education && userData.Education.length>0)
                ?(
                    <SelectedUserEducation background={props.background} 
                        fontColor={props.fontColor} themeData={props.themeData}
                        education={userData.Education}
                    />
                )
                :(
                    <></>
                )
            }
            {
                (userData.WorkExperience && userData.WorkExperience.length>0)
                ?(
                    <SelectedUserProfession background={props.background} 
                        fontColor={props.fontColor} themeData={props.themeData}
                        professional={userData.WorkExperience}
                    />
                )
                :(
                    <></>
                )
            }
            {
                (userData.Projects && userData.Projects.length>0)
                ?(
                    <SelectedUserProjects background={props.background} 
                    fontColor={props.fontColor} themeData={props.themeData}
                    projects={userData.Projects}
                    />
                )
                :(
                    <></>
                )
            }
            {
                (userData.Interests)
                ?(
                    <SelectedUserInterests background={props.background} 
                    fontColor={props.fontColor} themeData={props.themeData}
                    interests={userData.Interests}
                    />
                )
                :(
                    <></>
                )
            }
            {
                (userData.posted && userData.posted.length>0)
                ?(
                    <SelectedUserPosts  background={props.background} 
                    fontColor={props.fontColor} themeData={props.themeData}
                    posts={selectedUserPosts}
                    />
                )
                :(
                    <></>
                )
            }
        </div>
    )
}