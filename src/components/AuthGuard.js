import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// For routes that can only be accessed by authenticated users
const AuthGuard = ({ children }) => {
  const auth = useSelector((state) => state.authReducer);

  if (auth.user) {
    return children;
  }

  return <Redirect to="/auth/sign-in" />;
};

export default AuthGuard;
