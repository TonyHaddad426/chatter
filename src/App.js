import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import ActiveChats from "./Components/ActiveChats/ActiveChats";
import AuthForm from "./Components/Authentication/AuthForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const currentUser = localStorage.getItem(
    "CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.LastAuthUser"
  );

  const token = localStorage.getItem(
    `CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.${currentUser}.idToken`
  );

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
