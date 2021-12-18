import React from "react";
import classes from "./Logout.module.css";
import "cross-fetch/polyfill";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

function Logout(props) {
  const poolData = {
    UserPoolId: "us-east-1_jBfRxKNkx",
    ClientId: "7kc4rfc9ehbh5al4nakqa3doja",
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();

  const logoutHandler = (event) => {
    event.preventDefault();
    cognitoUser.signOut();
    props.setIsLoggedIn((prevState) => !prevState);
    localStorage.removeItem("convo")
  };

  return (
    <div className={classes.button_slide}>  
      <button type="button"  onClick={logoutHandler}>
        Logout
      </button>
      </div>

  );
}

export default Logout;
