import React, { useState, useRef } from "react";
import classes from "./ActiveChat.module.css";
import Moment from 'react-moment'; 

function ActiveChat(props) {
  const [newMessage, setNewMessage] = useState();

  const messageInputHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevents default of request being sent.. which makes sure the page doesn't reload prematurely

    console.log(newMessage);
  };

  console.log(props.conversationHist.messages);
  return (
    <div>
      {props.conversationHist.messages.map((conversation) => (
        <li key={conversation.time} className={classes.item}>
          {conversation.sender}
          <p>{conversation.message}</p>
          <hr />
          <Moment fromNow>{new Date(conversation.time).toDateString()}</Moment>
        </li>
      ))}
      <form onSubmit={submitHandler}>
      
        <input
          type="textarea"
          value={newMessage}
          onChange={messageInputHandler}
        />
      </form>
      <button type="submit">Send</button>
    </div>
  );
}

export default ActiveChat;
