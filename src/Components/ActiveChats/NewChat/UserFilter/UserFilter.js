import React, { useState, useEffect } from "react";
import classes from "./UserFilter.module.css";

function UserFilter(props) {
  const [username, setUsername] = useState("");

  const usernameInputHandler = (event) => {
    setUsername(event.target.value);
  };

  let filtered = [];
  if (username !== "") {
    filtered = props.userList.filter(function (user) {
      return user.indexOf(username) > -1;
    });
  }

  useEffect(() => {
    if (filtered.length > 0 && filtered.length !== props.userList.length) {
      console.log("HI");
      props.setUpdatedUserList(filtered);
    }
    if (filtered.length === props.userList.length) {
      props.setUpdatedUserList();
    }
  }, [username]);

  console.log("user list ", props.userList);
  console.log("filtered list ", filtered);
  return (
    <input
      className={classes.input}
      type="text"
      name="search"
      value={username}
      onChange={usernameInputHandler}
      placeholder="Search username here..."
    />
  );
}

export default UserFilter;
