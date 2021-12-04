import React, { useState, useEffect } from "react";
import classes from "./ActiveChats.module.css";
import ActiveChat from "./ActiveChat/ActiveChat";
import NewChat from "./NewChat/NewChat";
import Logout from "../Authentication/Logout/Logout"
import Moment from "react-moment";
import "../../App.css";

function ActiveChats(props) {
  const [conversationHist, setConversationHist] = useState();
  const [newChatToggle, setNewChatToggle] = useState(false);
  const [userList, setUserList] = useState();

  if (conversationHist) {
    if (!conversationHist.messages) {
      // fetch active conversations after new conversation has been started
      fetch(
        `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations`
      )
        .then((response) => {
          return response.json(); // return promise
        })
        .then((data) => {
          console.log(
            "API convo list response from API Gateway and Lambda: ",
            data
          );
          props.setActiveConversations(data);
        })
        .catch((err) => console.log(err));
    }
  }
  
  console.log("Conversation detail", conversationHist);

  // fetch list of available users to start new chat with
  const getUserList = (event) => {
    event.preventDefault();

    fetch(`https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/users`)
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("User list from cognito API: ", data);

        setUserList(data);
        setNewChatToggle(true);
      })
      .catch((err) => console.log(err));
  };

  // fetch conversation history when user selects clicks on a specific conversation
  const getConversation = (event) => {
    event.preventDefault();
    console.log("Conversation ID being retreived ", event.currentTarget.value);
    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${event.currentTarget.value}`
    )
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("open chat convo from API Gateway and Lambda: ", data);
        setConversationHist(data);
      })
      .catch((err) => console.log(err));
  };

  let display;
  if (props.activeConversations) {
    display = props.activeConversations.map((conversation) => (
      <tr key={conversation.id} className={classes.row}>
        <th>
          <button
            type="submit"
            value={conversation.id}
            onClick={getConversation}
          >
            {conversation.participants[0]}
          </button>
        </th>
        <th>
          <Moment fromNow>{conversation.last}</Moment>
        </th>
        <th>Delete</th>
      </tr>
    ));
  } else {
    display = <tr>Click above to start a new chat!</tr>;
  }

  return (
    <div className={classes.flex_container}>
      <div className={classes.flex_child}>
        <h1>Chats</h1>
        {!newChatToggle && (
          <div>
            {" "}
            <button type="submit" onClick={getUserList}>
              Start New Chat
            </button>
            <table className={classes.table}>{display}</table>{" "}
          </div>
        )}
        {newChatToggle && (
          <NewChat
            setNewChatToggle={setNewChatToggle}
            setConversationHist={setConversationHist}
            userList={userList}
          />
        )}
      </div>
      <div className={classes.flex_child}>
        <Logout setIsLoggedIn={props.setIsLoggedIn} setCurrentUser={props.setCurrentUser} ></Logout>
        {!conversationHist && (
          <div>Click on a conversation to open it here</div>
        )}
        {conversationHist && (
          <ActiveChat
            setConversationHist={setConversationHist}
            conversationHist={conversationHist}
          >
            {" "}
          </ActiveChat>
        )}
      </div>
    </div>
  );
}

export default ActiveChats;
