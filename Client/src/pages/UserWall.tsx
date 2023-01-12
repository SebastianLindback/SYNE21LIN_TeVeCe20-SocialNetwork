import React from "react";
import CreatePostForm from "../components/forms/CreatePostForm";
import PostsToUser from "../components/collections/PostsToUser";
import Heading from "../components/Heading";
import NavMenu from "../components/NavMenu";

const UserWall = () => {

  return (
    <div className="container">
      {/* MENU */}
      <NavMenu menuItems={[
        {to:"/", text:"My feed"},
        {to:"/explore", text:"Explore Users"},
      ]}/>

      {/* HEADER */}
      <Heading title="User wall" subtitle=""/>

      {/* CONTENT */}
      <CreatePostForm />
      <PostsToUser/>
      
    </div>
  );
};

export default UserWall;
