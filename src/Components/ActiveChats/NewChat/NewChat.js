import React from "react";

function NewChat(props) {
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
      <th>{user}</th>

      <th>
        {" "}
        <button type="submit" value={user} onClick={usernameInputHandler}>
          Start Chat
        </button>
      </th>
    </tr>
  ));

  return <table> {display}</table>;
}

export default NewChat;
