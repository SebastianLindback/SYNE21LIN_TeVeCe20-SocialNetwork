import { useMutation, useQueryClient } from "@tanstack/react-query";
import Agent from "../actions/Agent";
import "../css/UserStyle.css";
import React, { useState } from "react";

interface props {
  queryKey : string[]
}

function UserCreate({queryKey} : props) {
  const [name, setName] = useState("");
  enum btnStates {
    neutral = "neutral",
    success = "success",
    error = "error"
  }
  const [btnState, setBtnState] = useState(btnStates.neutral)

  const queryClient = useQueryClient();
  const {mutate : createUser} = useMutation(() => { return Agent.Users.User(name).then(res => res)},
  {
      onSuccess : () => {
        queryClient.invalidateQueries(queryKey);
        queryClient.refetchQueries(queryKey);
        setBtnState(btnStates.success);
      },
      onError : (data) => {
        console.log(data);
        setBtnState(btnStates.error);
      }
  });

  const nameInput = (name: React.ChangeEvent<HTMLInputElement>) => {
    setName(name.target.value);
  };
  

  return (
    <>
      <div className="CreateUserForm">
        <h2>Create a new user</h2>
        <input onChange={nameInput} placeholder="First and Last Name" />
        <button id="CreateUserButton" 
        style={
          btnState == btnStates.success ? {backgroundColor : "green"}
          : 
          btnState == btnStates.error ? {backgroundColor : "red"}
          :
          {}
        } 
        onClick={() => createUser()}>
          {
          btnState == btnStates.success ? "User Created"
          : 
          btnState == btnStates.error ? "Issue Creating User"
          :
          "Create User"}
        </button>
        <br />
        <br />
        <button id="FollowList">Follow List</button>
        <br />
        <br />
      </div>
    </>
  );
}
export default UserCreate;
