import React from "react";
import NavbarComponent from "../components/navbarComponent";
import FeedComponent from "../components/feedComponent";

export default function ExplorePage(props) {
  return (
    <>
      <NavbarComponent 
        background={props.background} fontColor={props.fontColor}
        themeData={props.themeData}
      />
      <FeedComponent background={props.background} fontColor={props.fontColor}/>
    </>
  );
}
 