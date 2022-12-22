import Agent from "../actions/Agent";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Link,
  useAsyncValue,
  useFetcher,
  useMatch,
  useParams,
} from "react-router-dom";
import { User } from "../models/User";
import React, { useState } from "react";
import { UsersResponse } from "../models/UsersResponse";
import { displayValue } from "@tanstack/react-query-devtools/build/lib/utils";

function UserCreate() {
  const [name, setName] = useState("");

  const nameInput = (name: React.ChangeEvent<HTMLInputElement>) => {
    setName(name.target.value);
  };

  const logName = () => {
    Agent.Users.User(name).then((response) => response);
  };

  const [data, setData] = useState<UsersResponse>();

  const logPost = async () => {
    var result = await Agent.Users.All().then((response) => response);
    setData(result);
  };

  return (
    <>
      <link rel="stylesheet" href={require("../css/UserStyle.css")} />
      <div className="CreateUserForm">
        <h2>Create a new user</h2>
        <input onChange={nameInput} placeholder="First and Last Name" />
        <button id="CreateUserButton" onClick={logName}>
          Create User
        </button>
        <br />
        <br />
        <button id="PostUserButton" onClick={logPost}>
          Post User
        </button>
        <button id="FollowList">Follow List</button>
        <br />
        <br />
      </div>
      {data && (
        <div className="ss">
          {data.users.map((x) => (
            <div className="UserProfiles">
              <br />
              <div className="UserInformation">
                <h4>
                  <img
                    className="mr-3 rounded-circle"
                    src={require("../photos/profile.png")}
                  />
                  {x.name}
                  <div>
                    {/* Hårdkodad länk */}
                    <a href="http://localhost:3000/conversation/1/2">
                      <button id="MessageButton">Message</button>
                    </a>
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
}
export default UserCreate;
