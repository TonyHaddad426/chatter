import "cross-fetch/polyfill";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
// import * as AWS from "aws-sdk";

const poolData = {
  UserPoolId: "us-east-1_jBfRxKNkx",
  ClientId: "7kc4rfc9ehbh5al4nakqa3doja",
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);




// this helpler function retrieves the cognito ID token, which is required to authenticate user actions
export function getIdToken(currentUser) {
  return new AmazonCognitoIdentity.CognitoIdToken({
    IdToken: localStorage.getItem(
      `CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.${currentUser}.idToken`
    ),
  });
}

// this helpler function retrieves the current logged in username 
export function getCurrentUser() {
  return localStorage.getItem(
    `CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.LastAuthUser`
  );
}

// this helpler function performs user login
export function authenticate(enteredUsername, enteredPassword, setIsLoggedIn) {
  console.log(enteredUsername, enteredPassword);
  const authenticationData = {
    Username: enteredUsername,
    Password: enteredPassword,
  };
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  const userData = {
    Username: enteredUsername,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function () {
      console.log("success");
      return setIsLoggedIn((prevState) => !prevState);
    },
    onFailure: function () {
      console.log("fail");
      return alert("Invalid user credentials");
    },
  });
}

// this helper function signs out a user
export function signup(enteredUsername, enteredPassword, enteredEmail, setUserName, setShowVerifyCode) {
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
      if (err) {
        return alert(err.message || JSON.stringify(err));
      } else {
        setUserName(enteredUsername);
        setShowVerifyCode((prevState) => !prevState);
        return;
      }
    }
  );
}

// this helper function cinforms signup verification code
export function confirmReg(enteredUsername, enteredCode,setShowVerifyCode,setIsLogin) {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: enteredUsername,
    Pool: userPool,
  });
  cognitoUser.confirmRegistration(enteredCode, true, function (err, results) {
    console.log(enteredCode);
    if (err) {
      return alert(err.message || JSON.stringify(err))
    } else {
      setShowVerifyCode((prevState) => !prevState); // close verify code component and bring user back to login/sign up homepage
      setIsLogin((prevState) => !prevState); // switch to log in form instead of sign up
      return;
    }
  });


}

// this helper function resends a new sign up verification code in case the previouslly sent one is lost or times out
export function resendCode(enteredUsername) {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: enteredUsername,
    Pool: userPool,
  });
  cognitoUser.resendConfirmationCode(function (err) {
    if (err) {
      return alert(err.message || JSON.stringify(err));
    }
    return;
  });

}

// this helper functions checks to see if the user sessions has expired or not
export function checkTokenExpiration(enteredUsername) {

  const AccessToken = new AmazonCognitoIdentity.CognitoAccessToken({
    AccessToken: localStorage.getItem(
      `CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.${enteredUsername}.accessToken`
    ),
  });
  const IdToken = new AmazonCognitoIdentity.CognitoIdToken({
    IdToken: localStorage.getItem(
      `CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.${enteredUsername}.idToken`
    ),
  });
  const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
    RefreshToken: localStorage.getItem(
      `CognitoIdentityServiceProvider.7kc4rfc9ehbh5al4nakqa3doja.${enteredUsername}.refreshToken`
    ),
  });

  const sessionData = {
    IdToken: IdToken,
    AccessToken: AccessToken,
    RefreshToken: RefreshToken,
  };
  const cachedSession = new AmazonCognitoIdentity.CognitoUserSession(
    sessionData
  );

  return cachedSession.isValid();

}

export const logout = function (setIsLoggedIn) {
  const cognitoUser = userPool.getCurrentUser();
  cognitoUser.signOut();
  setIsLoggedIn((prevState) => !prevState);
  localStorage.clear()
  return;
};




// this helper function is not use in any of the code base, but returns a javascript object with a key for each cognito token
const getTokens = function (session) {
  return {
    accessToken: session.getAccessToken().getJwtToken(),
    idToken: session.getIdToken().getJwtToken(),
    refreshToken: session.getRefreshToken().getToken(),
  };
};

