import React, { useRef } from "react";
import "cross-fetch/polyfill";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

function SignUpConfirm(props) {
  const codeInputRef = useRef();
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: props.enteredUsername,
    Pool: props.userPool,
  });
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredCode = codeInputRef.current.value;

    cognitoUser.confirmRegistration(enteredCode, true, function (err, results) {
      console.log(enteredCode);
      if (err) {
        alert(err);
      } else {
        console.log(results);
        
        props.setShowVerifyCode((prevState) => !prevState) // close verify code component and bring user back to login/sign up homepage
        props.setIsLogin((prevState) => !prevState) // switch to log in form instead of sign up
  
      }
    });
  };

  const resendCode = (event) => {
    event.preventDefault();
    cognitoUser.resendConfirmationCode(function (err) {
      if (err) {
        alert(err);
      }
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="code">A verification code has been sent to the provided email address</label>
          <input
            type="text"
            id="code"
            maxLength="20"
            required
            placeholder="Enter verification code..."
            ref={codeInputRef}
          />
          <button type="submit">Verify</button>
        </div>
        <button onClick={resendCode}>Resend Code</button>
      </form>
    </div>
  );
}

export default SignUpConfirm;
