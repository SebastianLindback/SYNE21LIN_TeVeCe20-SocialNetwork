import Agent from "../actions/Agent";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { SubscribersResponse } from "../models/SubscribersResponse";
import React, { useState } from "react";


const Subscription = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
console.log(subscriptionId);
  
  const [data, setData] = useState<SubscribersResponse>();

  const showSubscribers = async () => {
    var result = await Agent.Subscription.All(subscriptionId).then((response) => response);
    setData(result);
  };

  return (
    <>
  <button onClick={showSubscribers}>Show Subscriptions</button>
  {data && (<p className="">{data.subscriptions.map((x) => (x.subscriberId + " " + x.name))}</p>)}
    </>
  );
};

export default Subscription;
