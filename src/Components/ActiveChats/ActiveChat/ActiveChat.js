import React, { useState, useEffect } from "react";
import classes from "./ActiveChat.module.css";
import Moment from "react-moment";

function ActiveChat(props) {
  const [newMessage, setNewMessage] = useState("");
const convoId = props.conversationHist.id

  const messageInputHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const submitHandler = (event) => {
    // ADD NEW MESSAGE TO OPEN CONVERSATION
    event.preventDefault(); // prevents default of request being sent.. which makes sure the page doesn't reload prematurely

  
    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${convoId}`,
      {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          "Content-Type": "application/json",
          Authorization: props.token,
        },
      }
    )
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {})
      .catch((err) => console.log(err));
  };

  // load conversation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        "ActiveChat - Message hist id being requested: ",
        props.conversationHist.id
      );
      fetch(
        `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${convoId}`,
        {
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
          console.log(data)
          // if (!data.messages) {
          //   props.setConversationHist({id: props.conversationHist.id});
            
          // } else {
          //   console.log("ActiveChat - Message hist state updated: ", data);
          //   props.setConversationHist(data);
          // }
        })
        .catch((err) => console.log(err));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  let display;
  if (props.conversationHist.messages) {
    display = props.conversationHist.messages.map((conversation) => (
      <li key={conversation.time} className={classes.item}>
        {conversation.sender}
        <p>{conversation.message}</p>
        <hr />
        <Moment fromNow>{conversation.time}</Moment>
      </li>
    ));
  } else {
    display = <div>Send first message below!</div>;
  }

  return (
    <div>
      {display}

      <form onSubmit={submitHandler}>
        <input
          type="textarea"
          value={newMessage}
          onChange={messageInputHandler}
          placeholder="Type here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ActiveChat;
