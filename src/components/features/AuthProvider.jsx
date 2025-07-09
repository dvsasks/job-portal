import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const path = useLocation();

  if (!isSignedIn && isSignedIn !== undefined && isLoaded)
    return <Navigate to="/?sign-in=true" />;

  if (
    path.pathname !== "/onboarding" &&
    user !== undefined &&
    !user?.unsafeMetadata?.role
  ) {
    return <Navigate to="/onboarding" />;
  }
  return <div>{children}</div>;
};

export default AuthProvider;
