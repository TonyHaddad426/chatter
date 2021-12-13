import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import SignUpConfirm from "./SignUpConfirm/SignUpConfirm";
import Spinner from "../Styling/Spinner";

import "cross-fetch/polyfill";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

function AuthForm(props) {
  // move to config file
  const poolData = {
    UserPoolId: "us-east-1_jBfRxKNkx",
    ClientId: "7kc4rfc9ehbh5al4nakqa3doja",
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [user, setUserName] = useState("");
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  console.log("is login", isLogin)
  const switchAuthModeHandler = () => {
    // this udpates the state to toggle beetwen sign in and log in forms
    setIsLogin((prevState) => !prevState);
  };



  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      // if isLogin is true, then authenticate existing user

      const authenticationData = {
        Username: enteredUsername,
        Password: enteredPassword,
      };
      const authenticationDetails =
        new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

      const userData = {
        Username: enteredUsername,
        Pool: userPool,
      };

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function () {
          const token = localStorage.getItem(
            `CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.${enteredUsername}.idToken`
          );
          fetch(
            `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations`,
            {
              headers: { Authorization: token },
            }
          )
            .then((response) => {
              return response.json(); // return promise
            })
            .then((data) => {
              for (let key in data) {
                const index = data[key].participants.indexOf(enteredUsername);
                data[key].participants.splice(index, 1);
              }
     
         
              props.setIsLoggedIn((prevState) => !prevState);
            })
            .catch((err) => console.log(err));
        },
        onFailure: function () {
          alert("Invalid user credentials");
        },
      });
    } else {

      
      const enteredEmail = emailInputRef.current.value;
    
      // if isLogin is not true, then thr user is trying to sign up or create a new user
      const email = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: enteredEmail,
      });

      userPool.signUp(
        enteredUsername,
        enteredPassword,
        [email],
        null,
        function (err, result) {
         
          console.log(JSON.stringify(result));

          if (err) {
            alert(err.message || JSON.stringify(err));
          } else {
            setUserName(enteredUsername)
            setShowVerifyCode((prevState) => !prevState);
          }
        }
      );
    }
  };


  console.log(user)

    let display = (
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              maxLength="20"
              required
              ref={usernameInputRef}
            />
          </div>

          {!isLogin && (
            <div className={classes.control}>
              {" "}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                maxLength="100"
                required
                ref={emailInputRef}
              />{" "}
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              maxLength="20"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    );
  
  return (
    <div>
      {showVerifyCode && (
        <SignUpConfirm
          setShowVerifyCode={setShowVerifyCode}
          userPool={userPool}
          enteredUsername={user}
          setIsLogin={setIsLogin}
    
        />
      )}
      {!showVerifyCode && <div> {display}</div>}
    </div>
  );
}

export default AuthForm;
