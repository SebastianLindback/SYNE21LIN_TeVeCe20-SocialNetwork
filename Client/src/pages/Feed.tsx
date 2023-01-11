import Agent from "../actions/Agent";
import { Link, useNavigate } from "react-router-dom";
import "../css/UserStyle.css";
import React from "react";
import moment from "moment";
import SubscribeButton from "../components/buttons/SubscribeButton";
import { GetSubscription } from "../actions/useSubscription";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UsersResponse } from "../models/UsersResponse";
import Heading from "../components/Heading";
import NavMenu from "../components/NavMenu";
import ErrorPage from "./shared/ErrorPage";
import { PostsResponse } from "../models/PostsResponse";
import { FaRegCommentAlt, FaArrowRight } from "react-icons/fa";

const Feed = () => {
  const navigate = useNavigate()

  const {currentSubscriptions} = GetSubscription("1");
  var ids = currentSubscriptions?.subscriptions.map(x => x.subscribedToId);  

  const { data, error} = useQuery<PostsResponse, AxiosError>({
      queryKey: ["posts-from-subscriptions"],
      retry: () => false,
      enabled: ids?.length! > 0  ? true : false,
      queryFn: () => Agent.Posts.FromUsers(ids!)
  });

  if (error ) return (<div className="container">
      {/* MENU */}
      <NavMenu menuItems={[
        {to:"/subscriptions/1", text:"My Subscriptions"},
        {to:"/user/1/1", text:"My public wall"},
        {to:"/explore", text:"Explore Users"},
        {to:"/admin", text:"Admin"},
      ]}/>

      {/* HEADER */}
      <Heading title="Your Wall" subtitle="Will display posts from your subscriptions"/>

      {/* CONTENT */}
      <ErrorPage error={error}/>
    </div>
  );  
    console.log(data)
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
    <div className="container mx-auto col-12" style={{maxWidth:"800px"}}>
      {data && data.posts.map(post => 
        
        <div className="row text-white UserInformation mx-auto d-flex flex-row col-12" key={post.id}>
          <div className="col-md-4 col-sm-12">
                <img
                  className="row mr-3 mx-auto rounded-circle"
                  src={require("../photos/profile.png")}
                  alt={`profile of ${post.senderName}}`}
                  onClick={() => navigate(`/user/1/${post.senderId}`)}
                />
                <div className="row d-flex flex-column">
                <h3 className="mx-auto text-center py-2"><Link className="text-white " to={`/user/1/${post.senderId}`}>{post.senderName}</Link></h3>
                <h4 className="mx-auto ">{<FaRegCommentAlt/>}</h4>
                <h3 className="mx-auto"><Link className="text-white" to={`/user/1/${post.receiverId}`}>{post.receiverName}</Link></h3>
                </div>
                
          
          </div>
          <div className="col-md-8  col-sm-12">
            
            <div className="row d-flex flex-column justify-content-center text-center h-50">
              <p>{post.message}</p>
              <span className="text-muted">{moment( post.createdDate).format("YYYY-MM-DD HH:MM")}</span>
              
              
            </div>
            <div className="row d-flex flex-row justify-content-center m-0">
              <SubscribeButton fromUser="1" toUser={post.senderId!.toString()}/>
              <button id="MessageButton" onClick={() => navigate(`/conversation/1/${post.id}`)} className="btn btn-primary m-4">Message</button>
          </div>
          </div>
        </div> 
        )
      } 
    </div>
    </>
  );
};

export default Feed;
