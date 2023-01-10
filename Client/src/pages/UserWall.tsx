import React from "react";
import Agent from "../actions/Agent";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SubscribeButton from "../components/buttons/SubscribeButton";
import CreatePostForm from "../components/forms/CreatePostForm";
import { PostsResponse } from "../models/PostsResponse";
import { AxiosError } from "axios";
import ErrorPage from "./shared/ErrorPage";
import LoadingPage from "./shared/LoadingPage";

const Wall = () => {
  const { userId } = useParams<{ userId: string }>();

  const { isLoading, error, data } = useQuery<PostsResponse, AxiosError>({
    queryKey: ["UserWallData"],
    queryFn: () => Agent.Posts.User(userId).then((response) => response)
  });

  if (isLoading) return <div className="container"><CreatePostForm /><LoadingPage/></div>

  if (error) return (<div className="container"><CreatePostForm /><ErrorPage error={error}/></div>)
  console.log(data);
  
  return (
    <>
      <CreatePostForm />
      <div className="row bg-light text-dark rounded">
        <div className="col-sm rounded">
          <div className="float-left p-4">
            <h3 className="display-3">Wall</h3>
          </div>
          <div className="float-right p-4">
            <SubscribeButton fromUser="1" toUser={userId!}/>
          </div>
          <div className="clearfix"></div>
          <ul className="list-unstyled  p-3 mb-2">
            {data &&
              data.posts?.map((post) => (
                <li
                  className="media bg-white text-dark p-4 mb-4 border rounded"
                  key={post.id}
                >
                  <img
                    className="mr-3 rounded-circle"
                    src={`https://i.pravatar.cc/75?=${post.id}`}
                    alt="{post.message}"
                  />
                  <div className="media-body">
                    <p className="mt-0 mb-1 lead">{post.message}</p>
                    <samp>{post.createdDate.toLocaleString()}</samp>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Wall;
