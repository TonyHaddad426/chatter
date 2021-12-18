import React, { useState } from "react";
import classes from "../ActiveChats.module.css";
import UserFilter from "./UserFilter/UserFilter";

function NewChat(props) {
  const [userList, setUserList] = useState(props.userList);
  const [updatedUserList, setUpdatedUserList] = useState();

  const goBackHandler = (event) => {
    event.preventDefault();
    props.setNewChatToggle((prevState) => !prevState);
  };
  const usernameInputHandler = (event) => {
    event.preventDefault();
    const enteredUsername = event.currentTarget.value;
    console.log("username: ", enteredUsername, "token: ", props.token);
    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations`,
      {
        method: "POST",
        body: JSON.stringify([enteredUsername]),
        headers: {
          "Content-Type": "application/json",
          Authorization: props.token,
        },
      }
    )
      .then((response) => {
        console.log(response)
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("Create new chat: ", data);

        // update to include "send first message, message"
  

        props.setActiveConversations((prevState) => [
          ...prevState,
          { id: data, participants: [enteredUsername] },
        ]);
        props.setNewChatToggle((prevState) => !prevState);
        props.setConversationHist({ id: data });
      })
      .catch((err) => alert(err));
  };

  let display;

  if (!updatedUserList) {
    display = userList.map((user) => (
      <tr key={user}>
        <div className={classes.btn1}>
          <button type="submit" value={user} onClick={usernameInputHandler}>
            <span className={classes.row}> {user} </span>
          </button>
        </div>
      </tr>
    ));
  }

  if (updatedUserList) {
    display = updatedUserList.map((user) => (
      <tr key={user}>
        <div className={classes.btn1}>
          <button type="submit" value={user} onClick={usernameInputHandler}>
            <span className={classes.row}> {user} </span>
          </button>
        </div>
      </tr>
    ));
  }

  return (
    <div>
      <UserFilter userList={userList} setUpdatedUserList={setUpdatedUserList}>
        {" "}
      </UserFilter>
      <table className={classes.table}>
        <tbody>{display} </tbody>
      </table>
      <div className={classes.button_slide}>
        <button type="submit" onClick={goBackHandler}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NewChat;
