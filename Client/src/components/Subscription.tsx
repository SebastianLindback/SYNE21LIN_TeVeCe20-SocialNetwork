import Agent from "../actions/Agent";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Post from "./Post";
import { SubscribersResponse } from "../models/SubscribersResponse";
import { useState } from "react";

const Subscription = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  console.log(subscriptionId);

  const [data, setData] = useState<SubscribersResponse>();

  const showSubscribers = async () => {
    var result = await Agent.Subscription.All(subscriptionId).then(
      (response) => response
    );
    setData(result);
  };

  return (
    <>
      <link rel="stylesheet" href={require("../css/SubscriptionStyle.css")} />
      <button onClick={showSubscribers}>Show Subscriptions</button>
      {data && (
        <div className="followers">
          <h1>People You Follow:</h1>
          {data.subscriptions.map((x) => (
            <div className="parent">
              <div className="child">
                {" "}
                <Link to={`/user/${x.id}`}>
                  <img
                    className="mr-3 rounded-circle"
                    src={require("../photos/profile.png")}
                  />
                </Link>
              </div>
              <div className="child">
                <p>{x.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Subscription;
