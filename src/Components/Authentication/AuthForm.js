import React, { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import SignUpConfirm from "./SignUpConfirm/SignUpConfirm";
import Spinner from "../Styling/Spinner";
import {
  getIdToken,
  authenticate,
  getCurrentUser,
  signup,
} from "../../cognitoAuth";

function AuthForm(props) {
  // move to config file

  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [user, setUserName] = useState("");
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  console.log("is login", isLogin);
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
      authenticate(enteredUsername, enteredPassword, props.setIsLoggedIn);
    } else {
      const enteredEmail = emailInputRef.current.value;

      signup(
        enteredUsername,
        enteredPassword,
        enteredEmail,
        setUserName,
        setShowVerifyCode
      );
    }
  };

  console.log(user);

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
          enteredUsername={user}
          setIsLogin={setIsLogin}
        />
      )}
      {!showVerifyCode && <div> {display}</div>}
    </div>
  );
}

export default AuthForm;
