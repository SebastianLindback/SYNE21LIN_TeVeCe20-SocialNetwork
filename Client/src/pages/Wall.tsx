import Agent from "../actions/Agent";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "../css/UserStyle.css";
import UserCreate from "./UserCreate";
import React from "react";

const Wall = () => {
  const queryKey = ["wallData"];
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: () => Agent.Users.All().then((response) => response),
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
      <UserCreate queryKey={queryKey} />
      {data && (
        <div className="ss">
          {data.users.map((x) => (
            <div className="UserProfiles">
              <br />
              <div className="UserInformation">
                <h4>
                  <Link to={`/user/${x.id}`}>
                    <img
                      className="mr-3 rounded-circle"
                      src={require("../photos/profile.png")}
                      alt={`profile of x.name}`}
                    />
                  </Link>
                  {x.name}
                  <div>
                    {/* Hårdkodad länk */}
                    <Link to={`/conversation/1/${x.id}`}>
                      <button id="MessageButton">Message</button>
                    </Link>
                    <button id="FollowButton">Follow</button>
                  </div>
                  <br />
                </h4>
              </div>
              <br></br>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Wall;
