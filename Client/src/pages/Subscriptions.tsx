import Agent from "../actions/Agent";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import moment from "moment";
import SubscribeButton from "../components/buttons/SubscribeButton";
import Heading from "../components/Heading";
import { SubscribersResponse } from "../models/SubscribersResponse";
import { AxiosError } from "axios";
import ErrorPage from "./shared/ErrorPage";


const Subscription = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const { data, error } = useQuery<SubscribersResponse, AxiosError>({
    queryKey: ["subscriptions-user_" + subscriptionId],
    retry: () => false,
    queryFn: () => Agent.Subscription.All(subscriptionId).then((response) => response),
  });

  if (error) return (
    <div className="container">

      {/* HEADER */}
      <Heading title="my subscriptions" subtitle="will display your subscriptions"/>

      {/* CONTENT */}
      <ErrorPage error={error}/>
    </div>
  );


  return (
    <div className="container">

      {/* HEADER */}
      <Heading title="my subscriptions" subtitle="will display your subscriptions"/>

      {/* CONTENT */}
      {data?.subscriptions.map((subscription) => (
              <div className="row">
                <div className="mx-auto UserInformation " key={data.subscriptions.indexOf(subscription)}>
                    <Link to={`/user/1/${subscription.subscribedToId}`}>
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
