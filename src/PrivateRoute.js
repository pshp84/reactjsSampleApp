import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  let authUser = JSON.parse(sessionStorage.getItem("authUser"));

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
}
