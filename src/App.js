import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { SignUpForm, ConfirmationForm, UnauthenticatedLink, SignOutLink, SignInForm, Protected } from "./auth/components";
import { NavLink } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";

import { Home, Private, Public, NotFound } from "./components";

import "./App.css";

const RouteWithRedirect = ({ path , redirect = "/", ...props }) => (
    <Route path={path}>
        <Protected {...props}>
            <Redirect to={redirect}/>
        </Protected>
    </Route>
);

export default ({ history }) => (
    <ConnectedRouter history={history}>
        <div className="container">
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/public" exact>Public</NavLink>
                <NavLink to="/private" exact>Private</NavLink>
                <UnauthenticatedLink to="/auth/login" exact>Login</UnauthenticatedLink>
                <UnauthenticatedLink to="/auth/register" exact>Register</UnauthenticatedLink>
                <Protected component={null}>
                    <SignOutLink className={"btn"}>Sign Out</SignOutLink>
                </Protected>
            </nav>
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route path={"/public"} component={Public} />
                <Route path={"/private"} component={Private} />
                <RouteWithRedirect path={"/auth/login"} component={SignInForm} />
                <RouteWithRedirect path={"/auth/register"} component={SignUpForm} />
                <RouteWithRedirect path={"/auth/confirm"} component={ConfirmationForm} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </ConnectedRouter>
);