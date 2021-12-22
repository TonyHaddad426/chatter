import React, { useState, useEffect } from "react";
import classes from "./ActiveChats.module.css";
import ActiveChat from "./ActiveChat/ActiveChat";
import NewChat from "./NewChat/NewChat";
import Logout from "../Authentication/Logout/Logout";
import Moment from "react-moment";


import "../../App.css";

function ActiveChats(props) {
  const [activeConversations, setActiveConversations] = useState([]);
  const [conversationHist, setConversationHist] = useState();
  const [newChatToggle, setNewChatToggle] = useState(false);
  const [userList, setUserList] = useState();

  if (conversationHist) {
    localStorage.setItem("convo", conversationHist.id);
  }
  console.log("Active Chats - convo hist id: ", conversationHist);
  useEffect(() => {
    // FETCH ACTIVE CHATS LIST

    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations`,
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
        console.log("Actice Chats fetch: ", data);
        for (let key in data) {
          const index = data[key].participants.indexOf(props.currentUser);
          data[key].participants.splice(index, 1);
        }
        setActiveConversations(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // fetch list of available users to start new chat with
  const getUserList = (event) => {
    event.preventDefault();

    fetch(`https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
    })
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("user list", data);
        setUserList(data);
        setNewChatToggle((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  // fetch conversation history when user selects clicks on a specific conversation
  const getConversation = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.value);
    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${event.currentTarget.value}`,
      {
        headers: {
          Authorization: `${props.token}`,
        },
      }
    )
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        console.log("get conversation: ", data);
        setConversationHist(data);
      })
      .catch((err) => console.log(err));
  };
  let display;
  if (activeConversations) {
    display = activeConversations.map((conversation) => (
      <tr key={conversation.id}>
        <div className={classes.btn1}>
          <button
            type="submit"
            value={conversation.id}
            onClick={getConversation}
          >
            <span>
              <span className={classes.row}>
                {conversation.participants[0]}
              </span>
              <span></span>
              <Moment className = {classes.italics} fromNow>{conversation.last}</Moment>
            </span>
          </button>
        </div>
      </tr>
    ));
  } else {
    display = <tr>Click above to start a new chat!</tr>;
  }

  return (
    <div className={classes.flex_container}>
      <div className={classes.flex_child_1}>
      <Logout setIsLoggedIn={props.setIsLoggedIn}></Logout>
        <div className={classes.title}>Chatter</div>
        {!newChatToggle && (
          <div>
            <div className={classes.button_slide}>
              <button type="submit" onClick={getUserList}>
                Start New Chat
              </button>
            </div>
            <table className={classes.table}>
              <tbody>{display}</tbody>
            </table>
          </div>
        )}
        {newChatToggle && (
          <NewChat
            setActiveConversations={setActiveConversations}
            activeConversations={activeConversations}
            setNewChatToggle={setNewChatToggle}
            setConversationHist={setConversationHist}
            userList={userList}
            token={props.token}
          />
        )}
     
      </div>
      <div className={classes.flex_child_2}>
        {!conversationHist && (
          <h1 className={classes.header}>
            Click on or start a new chat on the left!
          </h1>
        )}
        {conversationHist && (
          <ActiveChat
            currentUser={props.currentUser}
            setActiveConversations={setActiveConversations}
            setConversationHist={setConversationHist}
            conversationHist={conversationHist}
            token={props.token}
          >
          </ActiveChat>
        )}
      </div>
    </div>
  );
}

export default ActiveChats;
