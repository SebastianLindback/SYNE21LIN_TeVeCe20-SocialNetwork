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
      <link rel="stylesheet" href={require("./style.css")} />
      <div className="CreateUserForm">
        <input onChange={nameInput} placeholder="First and Last Name" />
        <br />
        <br />
        <button onClick={logName}>Create User</button>
        <br />
        <br />
        <button onClick={logPost}>Post User</button>
        <br />
        <br />
        {data && (
          <li className="media bg-white text-dark p-4 mb-4 border rounded">
            <div className="">
              <p className="">
                {data.users.map((x) => (
                  <div className="UserProfiles">
                    <div className="OneUserProfile">
                      {" "}
                      <br />{" "}
                      <img
                        className="mr-3 rounded-circle"
                        src={require("./profile.png")}
                      />
                      <div className="UserInformation">
                        <h4>
                          {x.id} {x.name} <br />
                        </h4>
                        <button>Message</button> <button>Follow</button>
                      </div>
                    </div>
                    <br></br>{" "}
                  </div>
                ))}
              </p>
            </div>
          </li>
        )}
      </div>
    </>
  );
}
export default UserCreate;

{
}
