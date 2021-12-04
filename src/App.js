import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import ActiveChats from "./Components/ActiveChats/ActiveChats";
import AuthForm from "./Components/Authentication/AuthForm";

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeConversations, setActiveConversations] = useState([]);

 



  return (
    <div className="App">
      {!isLoggedIn && (
        <div>
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>
            <AuthForm setCurrentUser={setCurrentUser} setActiveConversations={setActiveConversations} setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <ActiveChats currentUser = {currentUser} activeConversations={activeConversations} setActiveConversations={setActiveConversations} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
        </div>
      )}
    </div>
  );
}

export default App;
