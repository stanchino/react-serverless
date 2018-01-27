import React from "react";
import { routerMiddleware } from "react-router-redux";
import configureStore from "redux-mock-store";
import connectComponent, { history } from "./shared-examples";

import {
    ConfirmationForm,
    Home,
    NotFound,
    PrivateComponent,
    Public,
    SignInForm,
    SignUpForm
} from "../components";

import App from "../App";

const mockStore = configureStore([routerMiddleware(history)]);
const initialState = { isLoggedIn: false, flash: { error: null, notice: null } };

const subject = store => connectComponent(App, store);

const testRoute = (store, path, component, missing = false) => {
    history.push(path);
    if (!missing) {
        expect(subject(store)).toContainReact(component);
    } else {
        expect(subject(store)).not.toContainReact(component);
    }
};

const behavesLikeRouteWithRedirect = (store, path, redirect_path = "/") => {
    it(`redirects from ${path} to ${redirect_path}`, () => {
        history.push(path);
        subject(store);
        expect(history.location.pathname).toEqual(redirect_path);
    });
};

describe("routes", () => {
    describe("for unauthenticated users", () => {
        const store = mockStore({ auth: initialState });
        it("shows the home page", () => testRoute(store, "/", <Home/>));
        it("shows the public page", () => testRoute(store, "/public", <Public/>));
        it("displays the NotFound component", () => testRoute(store, "/testUrlForNotFound", <NotFound/>));
        it("shows the Login form for the /private path", () => testRoute(store, "/private", <SignInForm/>));
        it("does not show the PrivateComponent for the /private path", () => testRoute(store, "/private", <PrivateComponent/>, true));
        it("shows the registration form", () => testRoute(store, "/auth/register", <SignUpForm/>));
        it("shows the login form", () => testRoute(store, "/auth/login", <SignInForm/>));
        it("does not show the logout link", () => expect(subject(store).text()).not.toMatch("Sign Out"));
    });

    describe("for registered users", () => {
        const store = mockStore({ auth: { ...initialState, isLoggedIn: false, isRegistered: true } });
        it("shows the confirmRegistration form", () => testRoute(store, "/auth/confirm", <ConfirmationForm/>));
        it("does not show the logout link", () => expect(subject(store).text()).not.toMatch("Sign Out"));
    });

    describe("for authenticated users", () => {
        const store = mockStore({ auth: { ...initialState, isLoggedIn: true } });

        it("shows the home page", () => testRoute(store, "/", <Home/>));
        it("shows the public page", () => testRoute(store, "/public", <Public/>));
        it("displays the NotFound component", () => testRoute(store, "/testUrlForNotFound", <NotFound/>));
        it("does not show the Login form for the /private path", () => testRoute(store, "/private", <SignInForm/>, true));
        it("shows the PrivateComponent for the /private path", () => testRoute(store, "/private", <PrivateComponent/>));
        it("shows the logout link", () => expect(subject(store).text()).toMatch("Sign Out"));
        behavesLikeRouteWithRedirect(store, "/auth/login");
        behavesLikeRouteWithRedirect(store, "/auth/register");
        behavesLikeRouteWithRedirect(store, "/auth/confirm");
    });
});