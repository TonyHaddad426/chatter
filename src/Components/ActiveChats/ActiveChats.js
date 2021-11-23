import React, { useState, useEffect } from "react";
import classes from "./ActiveChats.module.css";
import ActiveChat from "./ActiveChat/ActiveChat";
import "../../App.css";

function ActiveChats(props) {
  const [conversationHist, setConversationHist] = useState();
  console.log("Conversation detail", conversationHist);
  // fetch conversation history when user selects clicks on a specific conversation
  const getConversation = (event) => {
    event.preventDefault();
    console.log("Conversation ID being retreived ", event.currentTarget.value);
    fetch(
      `https://thadd-chatter.s3.amazonaws.com/data/conversations/${event.currentTarget.value}.json`
    )
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("open chat convo from S3: ", data);
        setConversationHist(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.flex_container}>
      <div className={classes.flex_child}>
        <h1>Open Chats</h1>
        <button>Delete All</button>

        {props.activeConversations.map((conversation) => (
          <li key={conversation.id} className={classes.item}>
            <button
              type="submit"
              value={conversation.id}
              onClick={getConversation}
            >
              <h3>{conversation.participants[1]}</h3>
            </button>

            <hr />
            <button>Delete Chat</button>
          </li>
        ))}
      </div>
      <div className={classes.flex_child}>
        {!conversationHist && (
          <div>Click on a conversation to open it here</div>
        )}
        {conversationHist && (
          <ActiveChat conversationHist={conversationHist}> </ActiveChat>
        )}
      </div>
    </div>
  );
}

export default ActiveChats;
