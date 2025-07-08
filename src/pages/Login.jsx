import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { continueWithGoogle } = use(AuthContext);
  const clickHandler = () => {
    continueWithGoogle()
      .then((result) => {
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;

        console.log(errorCode);
      });
  };
  return (
    <div>
      <button className="btn" onClick={clickHandler}>
        Continue with google
      </button>
    </div>
  );
};

export default Login;
