import React, { useRef } from "react";
import classes from "../AuthForm.module.css";
import { confirmReg, resendCode } from "../../../cognitoAuth";

function SignUpConfirm(props) {
  const codeInputRef = useRef();

  const submitHandler = (event) => {
    console.log("Sign up submit handler");
    event.preventDefault();
    const enteredCode = codeInputRef.current.value;
    confirmReg(
      props.enteredUsername,
      enteredCode,
      props.setShowVerifyCode,
      props.setIsLogin
    );
  };

  const resendAuthCode = (event) => {
    event.preventDefault();
    resendCode(props.enteredUsername);
  };

  return (
    <div className={classes.auth}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="code">
            A verification code has been sent to the provided email address
          </label>
          <input
            type="text"
            id="code"
            maxLength="20"
            required
            placeholder="Enter verification code..."
            ref={codeInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button className={classes.toggle} onClick={submitHandler}>
            Verify Code
          </button>
        </div>
      </form>

      <div className={classes.actions}>
        <button className={classes.toggle} onClick={resendAuthCode}>
          Resend Code
        </button>
      </div>
    </div>
  );
}

export default SignUpConfirm;
