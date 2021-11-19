// import logo from './logo.svg';
// import './App.css';
import React, { useState } from "react";
import ActiveChats from "./Components/ActiveChats";

function App() {
  const [activeConversations, setActiveConversations] = useState([
    {
      participants: ["Student", "Brian"],
      id: "1",
    },
    {
      participants: ["Student", "Frank"],
      id: "2",
    },
  ]);

  const [conversationHist, setConversationHist] = useState([
    {
      id: "1",
      participants: ["Student", "Brian"],
      messages: [
        {
          sender: "Frank",
          time: 1512246342159,
          message: "This is Brian.",
        },
      ],
    },
    {
      id: "2",
      participants: ["Student", "Frank"],
      messages: [
        {
          sender: "Frank",
          time: 1512246342159,
          message: "This is Frank. I'm also sending you a message.",
        },
        {
          sender: "Student",
          time: 1512246342160,
          message: "Take a hike man.",
        },
      ],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ActiveChats
      activeConversations={activeConversations}
      conversationHist={conversationHist}
    />
  );
}

export default App;

// <div className="App">
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />

// </header>
// </div>
