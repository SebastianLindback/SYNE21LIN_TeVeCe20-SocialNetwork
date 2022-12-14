import Agent from "../actions/Agent";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useAsyncValue,
  useFetcher,
  useMatch,
  useParams,
} from "react-router-dom";
import { User } from "../models/User";
import React, { useState } from "react";
import { UsersResponse } from "../models/UsersResponse";

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
    var result = await Agent.Users.User(name);
    setData(result);
  };

  return (
    <>
      <div className="CreateUserForm">
        <input onChange={nameInput} placeholder="First and Last Name" />
        <br />
        <br />
        <button onClick={logName}>Create User</button>
        <br />
        <br />
        <h4>Creating User: {name}</h4>
        <button onClick={logPost}>Post User</button>
        {data && <div> {data.posts[1].id} </div>}
      </div>
    </>
  );
}
export default UserCreate;
