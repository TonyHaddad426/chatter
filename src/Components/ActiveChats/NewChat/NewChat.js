import React, { useState, useRef } from "react";

function NewChat(props) {

  const usernameInputHandler = (event) => {
    event.preventDefault();
    console.log("Data sent conversation post: ", [event.currentTarget.value]);

    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations`,
      {
        method: "POST",
        body: JSON.stringify([event.currentTarget.value]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("API response for creating new conversation: ", data);
        props.setNewChatToggle(false);
        props.setConversationHist({
            id: data
        })
      })
      .catch((err) => console.log(err));
    
  };

  const display = props.userList.map((user) => (
    <tr key={user}>
      <th>{user}</th>

      <th>
        {" "}
        <button type="submit" value={user.toString()} onClick={usernameInputHandler}>
          Start Chat
        </button>
      </th>
    </tr>
  ));

  return <table> {display}</table>;
}

export default NewChat;
