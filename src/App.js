import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import ActiveChats from "./Components/ActiveChats/ActiveChats";
import AuthForm from "./Components/Authentication/AuthForm";

import { getIdToken, getCurrentUser } from "./cognitoAuth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const currentUser = getCurrentUser();

  let token;
  if (currentUser) {
    token = getIdToken(currentUser).jwtToken;
  }

  console.log(currentUser, token);

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
