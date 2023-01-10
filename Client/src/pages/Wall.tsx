import Agent from "../actions/Agent";
import { useNavigate } from "react-router-dom";
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

const Wall = () => {
  const navigate = useNavigate()

  const {currentSubscriptions} = GetSubscription("1");
  var ids = currentSubscriptions?.subscriptions.map(x => x.subscribedToId);  

  const { data, error} = useQuery<UsersResponse, AxiosError>({
      queryKey: ["posts-from-subscriptions"],
      retry: () => false,
      queryFn: () => Agent.Users.Posts(ids! && ids!)
  });

  if (error ) return (<div className="container">
      {/* MENU */}
      <NavMenu menuItems={[
        {to:"/subscriptions/1", text:"My Subscriptions"},
        {to:"/user/1", text:"My public wall"},
        {to:"/explore", text:"Explore Users"},
        {to:"/admin", text:"Admin"},
      ]}/>

      {/* HEADER */}
      <Heading title="Your Wall" subtitle="Will display posts from your subscriptions"/>

      {/* CONTENT */}
      <ErrorPage error={error}/>
    </div>
  );  
    
  return (
    <>
    {/* MENU */}
    <NavMenu menuItems={[
        {to:"/subscriptions/1", text:"My Subscriptions"},
        {to:"/user/1", text:"My public wall"},
        {to:"/explore", text:"Explore Users"},
        {to:"/admin", text:"Admin"},
      ]}/>

    {/* HEADER */}
    <Heading title="Your Wall" subtitle="Will display posts from your subscriptions"/>

    {/* CONTENT */}
    <div className="row mx-auto" style={{maxWidth:"800px"}}>
      {data && data?.users?.map(user => (user.posts.map(post => 
        
        <div className="row col-12 text-white UserInformation" key={post.id}>
          <div className="col-4">
                <img
                  className="row mr-3 rounded-circle"
                  src={require("../photos/profile.png")}
                  alt={`profile of ${post.userName}}`}
                  onClick={() => navigate(`/user/${post.userId}`)}
                />
          
          </div>
          <div className="col-8">
            <div className="row d-flex flex-column" style={{height:"100px"}}>
              <h3>{post.userName}</h3>
              <p>{post.message}</p>
              <span className="text-muted">{moment( post.createdDate).format("YYYY-MM-DD HH:MM")}</span>
            </div>
            <div className="row float-right" style={{height:"50px"}}>
              <SubscribeButton fromUser="1" toUser={post.userId.toString()}/>
              <button id="MessageButton" onClick={() => navigate(`/conversation/1/${post.id}`)} className="btn btn-primary m-4">Message</button>
          </div>
          </div>
        </div> 
        )
      ))} 
    </div>
    </>
  );
};

export default Wall;
