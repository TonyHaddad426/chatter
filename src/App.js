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
    <div className="App">
      {!token && (
        <div>
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>
            <AuthForm  setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      )}
      {token && (
        <div>
          <ActiveChats
            currentUser={currentUser}
            token={token}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>
      )}
    </div>
  );
}

export default App;
