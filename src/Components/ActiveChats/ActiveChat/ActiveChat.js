import React, { useState, useRef } from "react";
import classes from "./ActiveChat.module.css";
import Moment from "react-moment";

function ActiveChat(props) {
  const [newMessage, setNewMessage] = useState();

  let conversationHist = props.conversationHist;

  const messageInputHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const submitHandler = (event) => {
    // ADD NEW MESSAGE TO OPEN CONVERSATION
    event.preventDefault(); // prevents default of request being sent.. which makes sure the page doesn't reload prematurely
    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${props.conversationHist.id}`,
      {
        method: "POST",
        body: newMessage,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("API response for creating new message: ", data);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      fetch(
        `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${props.conversationHist.id}`
      )
        .then((response) => {
          return response.json(); // return promise
        })
        .then((data) => {
          console.log("open chat convo from API Gateway and Lambda: ", data);
          props.setConversationHist(data);
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

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
    display = <div>Send first message below!</div>
  }


  console.log("conversation hist props", conversationHist);
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
