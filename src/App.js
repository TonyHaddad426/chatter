import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import ActiveChats from "./Components/ActiveChats/ActiveChats";
import AuthForm from "./Components/Authentication/AuthForm";
import {
  checkTokenExpiration,
  getIdToken,
  getCurrentUser,
} from "./cognitoAuth";
import "cross-fetch/polyfill";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setShowModal] = useState(false);

  const currentUser = getCurrentUser();

  let token;
  if (currentUser) {
    token = getIdToken(currentUser).jwtToken;
  }

  console.log(currentUser, token)
  // if (token) {
  //   checkTokenExpiration(currentUser)
  // }

  return (
    <main className="App">
      {!token && (
        <div>
          <img src={logo} className="App-logo" alt="logo" />

          <AuthForm setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
      {token && (
        <ActiveChats
          currentUser={currentUser}
          token={token}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </main>
  );
}

export default App;
