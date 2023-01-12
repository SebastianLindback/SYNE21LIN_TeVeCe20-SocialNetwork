
import "../css/UserStyle.css";
import React from "react";
import Heading from "../components/Heading";
import NavMenu from "../components/NavMenu";
import PostsFromSubscriptions from "../components/collections/PostsFromSubscriptions";

const Feed = () => {
  
  return (
    <>
    {/* MENU */}
    <NavMenu menuItems={[
        {to:"/subscriptions/1", text:"My Subscriptions"},
        {to:"/user/1/1", text:"My public wall"},
        {to:"/explore", text:"Explore Users"},
        {to:"/admin", text:"Admin"},
      ]}/>

    {/* HEADER */}
    <Heading title="Your Feed" subtitle="Will display posts from your subscriptions"/>

    {/* CONTENT */}
    <PostsFromSubscriptions/>
    </>
  );
};

export default Feed;
