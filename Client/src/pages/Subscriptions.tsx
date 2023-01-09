import Agent from "../actions/Agent";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import moment from "moment";
import SubscribeButton from "../components/buttons/SubscribeButton";


const Subscription = () => {
  const navigate = useNavigate();
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const { data } = useQuery({
    queryKey: ["subscriptions-user_" + subscriptionId],
    queryFn: () => Agent.Subscription.All(subscriptionId).then((response) => response),
  });
  
  return (
    <div className="container">
      <div className="row justify-content-around">
      <button className="menuItem" onClick={() => {navigate("/")}}>Home</button>
    </div>
      <h2 className="mx-auto text-center text-white p-2">My subscriptions</h2>
    {data?.subscriptions.map((subscription) => (
            <div className="row">
              <div className="mx-auto UserInformation " key={data.subscriptions.indexOf(subscription)}>
                  <Link to={`/user/${subscription.subscribedToId}`}>
                    <img
                      className="mr-3 rounded-circle"
                      src={require("../photos/profile.png")}
                      alt={`profile of subscription.name}`}
                    />
                  </Link>
                  <h4>{subscription.name}</h4>
                  <span className="text-white">Subscribed since: {moment(subscription.createdDate).format("YYYY-MM-DD") }</span>
                  
                  <div>
                    {/* Hårdkodad länk */}
                    <Link to={`/conversation/1/${subscription.subscribedToId}`}>
                      <button id="MessageButton" className="btn btn-primary m-4">Message</button>
                    </Link>
                    <SubscribeButton fromUser="1" toUser={subscription.subscribedToId.toString()}/>
                  </div>
            </div>
          </div>
          ))}
    </div>
  );
};

export default Subscription;
