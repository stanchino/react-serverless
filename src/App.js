import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { SignUpForm, ConfirmationForm, UnauthenticatedLink, SignOutLink, SignInForm, Protected } from "./auth/containers";
import { NavLink } from "react-router-dom";
import { Switch, Route } from "react-router";

import { Home, Private, Public, NotFound, RouteWithRedirect } from "./components";

import "./App.css";

export default ({ history }) => (
    <ConnectedRouter history={history}>
        <div className="container">
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/public" exact>Public</NavLink>
                <NavLink to="/private" exact>Private</NavLink>
                <UnauthenticatedLink to="/auth/login" exact>Sign In</UnauthenticatedLink>
                <UnauthenticatedLink to="/auth/register" exact>Sign Up</UnauthenticatedLink>
                <Protected component={null}>
                    <SignOutLink className={"btn"}>Sign Out</SignOutLink>
                </Protected>
            </nav>
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route path={"/public"} component={Public} />
                <Route path={"/private"} component={Private} />
                <RouteWithRedirect exact path={"/auth/login"} component={SignInForm} />
                <RouteWithRedirect exact path={"/auth/register"} component={SignUpForm} />
                <RouteWithRedirect exact path={"/auth/confirm"} component={ConfirmationForm} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </ConnectedRouter>
);