import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = use(AuthContext);
  if (!currentUser) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
