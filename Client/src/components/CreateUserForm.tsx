import { useMutation, useQueryClient } from "@tanstack/react-query";
import Agent from "../actions/Agent";
import "../css/UserStyle.css";
import React, { CSSProperties, useState } from "react";

enum btnStates {
  neutral = "neutral",
  success = "success",
  error = "error"
}
interface settings{
  text : string,
  disabled : boolean,
  color? : CSSProperties 
}

function UserCreate() {
  const [name, setName] = useState("");  
  const [btnState, setBtnState] = useState(btnStates.neutral)
  const [errorMessage, setErrorMessage] = useState("")

  const default_setting_neutral = {text:"Create User", disabled: false } as settings;
  const default_setting_success = {text:"User Created", disabled: true, color: {backgroundColor: "green"} } as settings;
  const default_setting_error = {text:errorMessage, disabled: true, color: { backgroundColor: "red" } } as settings;
  
  const queryClient = useQueryClient();
  const { mutate: createUser } = useMutation(() => { return Agent.Users.User(name).then(res => res) },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wallData"]);
        queryClient.refetchQueries(["wallData"]);
        setBtnState(btnStates.success);
      },
      onError: (data : string) => {
        setErrorMessage(data);
        setBtnState(btnStates.error);
      }
    });

  const nameInput = (name: React.ChangeEvent<HTMLInputElement>) => {
    setName(name.target.value);
    if (btnState !== btnStates.neutral) setBtnState(btnStates.neutral)
  };

  let current_setting = default_setting_neutral;
  if (btnState === btnStates.success) current_setting = default_setting_success    
  if (btnState === btnStates.error) current_setting = default_setting_error

  return (
    <>
      <div className="CreateUserForm mx-auto">
        <h2>Create a new user</h2>
        <input onChange={nameInput} placeholder="First and Last Name" />
        <button id="CreateUserButton"
          style={current_setting.color}
          onClick={() => name && createUser()}>
          {
            current_setting.text
          }
        </button>
      </div>
    </>

  );
}
export default UserCreate;
