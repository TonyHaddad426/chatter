import React from "react";
import classes from "./Logout.module.css";
import { logout } from "../../../cognitoAuth";

function Logout(props) {


  const logoutHandler = (event) => {
    event.preventDefault();
    logout(props.setIsLoggedIn);
  };

  return (
    <div className={classes.button_slide}>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
