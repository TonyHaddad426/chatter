import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import Spinner from "../Styling/Spinner";

function AuthForm(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const usernameInputRef = useRef();
  // const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    // this udpates the state to toggle beetwen sign in and log in forms
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: add validation
    if (isLogin) {
      setIsLoading(true);
      // if isLogin is true, then authenticate existing user
      if (enteredUsername === "Student" && enteredPassword) {
        console.log(
          "Updating logged in state and setting current user state in app,js"
        );
        props.setIsLoggedIn(true);
        props.setCurrentUser(enteredUsername);
        // fetch active conversations data for the just logged in user
        fetch(
          `https://hf9tlac6n0.execute-api.us-east-1.amazonaws.com/prod/conversations`
        )
          .then((response) => {
            return response.json(); // return promise
          })
          .then((data) => {
            console.log(
              "API convo list response from API Gateway and Lambda: ",
              data
            );

            for (let key in data) {
              const index = data[key].participants.indexOf(enteredUsername);
              data[key].participants.splice(index, 1);
            }
            console.log(data);
            props.setActiveConversations(data);
          })
          .catch((err) => console.log(err));
      }
    } else {
      setIsLoading(true);
      // else if isLogin is false, create new user
    }
  };

  return (
    <div>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              required
              ref={usernameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <Spinner />}
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
    </div>
  );
}

export default AuthForm;
