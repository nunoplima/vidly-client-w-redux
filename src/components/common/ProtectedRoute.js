import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = (props) => {
    const { component, location: { pathname: redirectPath }, ...rest } = props;
    return (
        <>
            {auth.getCurrentUser() ? (
                <Route component={component} {...rest} />
            ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { redirectPath }
                  }}/>
            )}
        </>
    );
};

export default ProtectedRoute;
