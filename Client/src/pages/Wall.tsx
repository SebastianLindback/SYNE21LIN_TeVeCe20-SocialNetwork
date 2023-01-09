import Agent from "../actions/Agent";
import { useNavigate } from "react-router-dom";
import "../css/UserStyle.css";
import React from "react";
import moment from "moment";
import SubscribeButton from "../components/buttons/SubscribeButton";
import { GetSubscription } from "../actions/useSubscription";
import { Post } from "../models/Post";
import { useMutation, useQuery } from "@tanstack/react-query";

const Wall = () => {
  const navigate = useNavigate()

  const {currentSubscriptions} = GetSubscription("1");
  var ids = currentSubscriptions?.subscriptions.map(x => x.subscribedToId);  

  const { data, error} = useQuery({
      queryKey: [`posts-users${ids && ids.join(",")}`],
      queryFn: () => ids && Agent.Users.Posts(ids!).then((response) => response),
  });
  
  console.log(data);
  
  if (error)
    return (
      <div className="row rounded">
        <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
          An error has occurred: ' + error
        </div>
      </div>
    );

  const UIposts = data?.users?.map(user => (user.posts.map(post => 
        
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
      ))
  
    
  return (
    <>
    <div className="row justify-content-around">
      <button className="menuItem" onClick={() => {navigate("/subscriptions/1")}}>My Subscriptions</button>
      <button className="menuItem" onClick={() => {navigate("/admin")}}>Admin</button>
    </div>
    <div className="row mx-auto" style={{maxWidth:"800px"}}>
      {UIposts && UIposts
      } 
    </div>
    </>
  );
};

export default Wall;
