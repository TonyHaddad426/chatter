import classes from "./ActiveChats.module.css";

function ActiveChats(props) {
  // on click of an active chat this should open a chat
  console.log(props.conversationHist);
  // on button click this should open a modal that enables you to select a user name to chat with
  return (
    <div>
      <h1>Active Chats</h1>
      <button>Delete All Chats</button>

      {props.conversationHist.map((conversation) => (
        <li key={conversation.id} className={classes.item}>
          <a>
            <h3>{conversation.participants[1]}</h3>
          </a>

          <hr />
          <div>
            Last message received on{" "}
            {new Date(conversation.messages[0].time).toDateString()}
          </div>
          <button>Delete Chat</button>
        </li>
      ))}
    </div>
  );
}

export default ActiveChats;
