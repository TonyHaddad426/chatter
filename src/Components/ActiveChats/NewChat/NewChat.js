import React from "react";
import classes from "../ActiveChats.module.css";

function NewChat(props) {
  const goBackHandler = (event) => {
    event.preventDefault();
    props.setNewChatToggle((prevState) => !prevState);
  };
  const usernameInputHandler = (event) => {
    event.preventDefault();
    const enteredUsername = event.currentTarget.value;

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
        return response.json(); // return promise
      })
      .then((data) => {
        // update to include "send first message, message"
        props.setConversationHist({ id: data });
        props.setActiveConversations((prevState) => [
          ...prevState,
          { id: data, participants: [enteredUsername] },
        ]);
        props.setNewChatToggle((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  const display = props.userList.map((user) => (
    <tr key={user}>
      <div className={classes.btn1}>
        <button type="submit" value={user} onClick={usernameInputHandler}>
          <span className={classes.row}> {user} </span>
        </button>
      </div>
    </tr>
  ));

  return (
    <div>
      <table className={classes.table}>
        {" "}
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
