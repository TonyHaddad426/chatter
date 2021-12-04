import React from "react";
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
    props.setIsLoggedIn(false);
    props.setCurrentUser();
  };

  return <button onClick={logoutHandler}>Logout</button>;
}

export default Logout;
