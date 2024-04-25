import React from "react";
import NavbarComponent from "../components/navbarComponent";
import FeedComponent from "../components/feedComponent";

export default function ExplorePage(props) {
  return (
    <>
      <NavbarComponent />
      <FeedComponent background={props.background} fontColor={props.fontColor}/>
    </>
  );
}
 