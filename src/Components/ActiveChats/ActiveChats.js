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

  useEffect(() => {
    if (props.token) {
      // FETCH ACTIVE CHATS LIST

      fetch(
        `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations`,
        {
          headers: { Authorization: props.token },
        }
      )
        .then((response) => {
          return response.json(); // return promise
        })
        .then((data) => {
          for (let key in data) {
            const index = data[key].participants.indexOf(props.currentUser);
            data[key].participants.splice(index, 1);
          }
          setActiveConversations(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // fetch list of available users to start new chat with

  const getUserList = (event) => {
    event.preventDefault();

    fetch(`https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/users`)
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        setUserList(data);
        setNewChatToggle((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  // fetch conversation history when user selects clicks on a specific conversation
  const getConversation = (event) => {
    event.preventDefault();

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
                {" "}
                {conversation.participants[0]}{" "}
              </span>

              <Moment fromNow>{conversation.last}</Moment>
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
        <h1 className={classes.title}>Chatter</h1>
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
            setNewChatToggle={setNewChatToggle}
            setConversationHist={setConversationHist}
            userList={userList}
            token={props.token}
          />
        )}
      </div>
      <div className={classes.flex_child_2}>
        <Logout setIsLoggedIn={props.setIsLoggedIn}></Logout>
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
            {" "}
          </ActiveChat>
        )}
      </div>
    </div>
  );
}

export default ActiveChats;
