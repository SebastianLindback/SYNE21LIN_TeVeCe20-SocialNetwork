import Agent from "../actions/Agent";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import "../css/UserStyle.css";
import React from "react";
import moment from "moment";
import SubscribeButton from "../components/buttons/SubscribeButton";

const Wall = () => {
  const navigate = useNavigate()
  const queryKey = ["posts"];
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: () => Agent.Posts.All().then((response) => response),
  });

  if (isLoading)
    return (
      <div className="row rounded">
        <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
          Loading...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="row rounded">
        <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
          An error has occurred: ' + error
        </div>
      </div>
    );

  return (
    <>
    <div className="row justify-content-around">
      <button className="menuItem" onClick={() => {navigate("/subscriptions/1")}}>My Subscriptions</button>
      <button className="menuItem" onClick={() => {navigate("/admin")}}>Admin</button>
    </div>
      {data && (
        <div className="row mx-auto" style={{maxWidth:"800px"}}>
          {data?.posts?.map((x) => (
            <div className="row col-12 text-white UserInformation">
              <div className="col-4">
              <Link to={`/user/${x.id}`}>
                    <img
                      className="row mr-3 rounded-circle"
                      src={require("../photos/profile.png")}
                      alt={`profile of ${x.userName}}`}
                    />
                  </Link>
              
              </div>
              <div className="col-8">
                <div className="row d-flex flex-column" style={{height:"100px"}}>
                  <h3>{x.userName}</h3>
                  <p>{x.message}</p>
                  <span className="text-muted">{moment( x.createdDate).format("YYYY-MM-DD HH:MM")}</span>
                </div>
                <div className="row float-right" style={{height:"50px"}}>
                  <SubscribeButton fromUser="1" toUser={x.id.toString()}/>
                  {/* Hårdkodad länk */}
                  <Link to={`/conversation/1/${x.id}`}>
                      <button id="MessageButton" className="btn btn-primary m-4">Message</button>
                    </Link>
              </div>
              </div>
            </div> 
          ))}
        </div>
      )}
    </>
  );
};

export default Wall;
