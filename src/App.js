import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import ActiveChats from "./Components/ActiveChats/ActiveChats";
import ActiveChat from "./Components/ActiveChats/ActiveChat/ActiveChat";
import AuthForm from "./Components/Authentication/AuthForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeConversations, setActiveConversations] = useState([]);
  console.log("isLoggedIn: ", isLoggedIn)
  // useEffect(() => {
  //   console.log("isLoggedIn: ", isLoggedIn)
  //   // fetch all active conversations if the user is logged in
  //   if (isLoggedIn) {
  //     fetch(
  //       `http://thadd-chatter.s3-website-us-east-1.amazonaws.com/data/conversations.json`
  //     )
  //       .then((response) => {
  //         return response.json(); // return promise
  //       })
  //       .then((data) => {
  //         console.log("API response from S3: ",data);
  //         setActiveConversations(data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [isLoggedIn]);

  // if (isLoggedIn) {

  //   fetch(
  //     `http://thadd-chatter.s3-website-us-east-1.amazonaws.com/data/conversations.json`
  //   )
  //     .then((response) => {
  //       return response.json(); // return promise
  //     })
  //     .then((data) => {
  //       console.log("API response from S3: ",data);
  //       setActiveConversations(data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  return (
    <div className="App">
      {!isLoggedIn && (
        <div>
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>
            <AuthForm setActiveConversations={setActiveConversations} setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <ActiveChats activeConversations={activeConversations} />
        </div>
      )}
    </div>
  );
}

export default App;
