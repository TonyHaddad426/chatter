import React, { useState, useEffect } from "react";
import classes from "./ActiveChat.module.css";
import Moment from "react-moment";

function ActiveChat(props) {
  const [newMessage, setNewMessage] = useState("");

  console.log("ACTIVE CHAT CONVO ID: ", props.conversationHist.id);
  // localStorage.setItem("convo", props.conversationHist.id);

  const messageInputHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const submitHandler = (event) => {
    // ADD NEW MESSAGE TO OPEN CONVERSATION
    event.preventDefault(); // prevents default of request being sent.. which makes sure the page doesn't reload prematurely
    setNewMessage("");
    fetch(
      `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${localStorage.getItem(
        "convo"
      )}`,
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
        return response; // return promise
      })
      .then((data) => console.log("Active Chat sent message: ", data))
      .catch((err) => console.log(err));
  };

  // load conversation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations/${localStorage.getItem(
          "convo"
        )}`,
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
          if (!data.messages) {
            props.setConversationHist({ id: props.conversationHist.id });
          } else {
            props.setConversationHist(data);
          }
        })
        .catch((err) => console.log(err));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  let display;
  if (props.conversationHist.messages) {
    console.log("loaded conversation hist: ", props.conversationHist);
    display = props.conversationHist.messages.map((conversation) => (
      <div key={conversation.time} className={conversation.message === '' ? classes.hidden : null}> 
        <div  className={classes.message}>
          <div
            className={
              conversation.sender === props.currentUser
                ? classes.currentUser
                : classes.notCurrentUser
            }
          >
            {conversation.sender}
          </div>
          {conversation.message}

          <hr />
          <Moment fromNow>{conversation.time}</Moment>
        </div>
      </div>
    ));
  } else {
    display = <tr>Send first message below!</tr>;
  }

  return (
    <div>
      <div className={classes.messagePane}>{display}</div>
      <div>
        <form onSubmit={submitHandler}>
          <input
            className={classes.textarea}
            type="text"
            value={newMessage}
            onChange={messageInputHandler}
            placeholder="Type here..."
          />
          <button className={classes.butt} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActiveChat;
