import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";

import createMemoryHistory from "history/createBrowserHistory";
import configureStore from "../stores";

import { ConfirmationForm, Home, NotFound, PrivateComponent, Public, SignInForm, SignUpForm } from "../components";
import { SignOutLink } from "../auth";

import { signUpRoutine, authRoutine, signOutRoutine } from "../auth/actions";

import App from "../App";

const history = createMemoryHistory();
const store = configureStore(history);

const subject = () => (
    mount(<Provider store={store}><App history={history}/></Provider>)
);

const testRoute = (description, path, component, count = 1) => {
    it(description, () => {
        history.push(path);
        if (1 === count) {
            expect(subject()).toContainReact(component);
        } else if (0 === count) {
            expect(subject()).not.toContainReact(component);
        }

    });
};

const behavesLikeRouteWithRedirect = (path, redirect_path = "/") => {
    it(`redirects from ${path} to ${redirect_path}`, () => {
        history.push(path);
        subject();
        expect(history.location.pathname).toEqual(redirect_path);
    });
};

describe("routes", () => {
    describe("for unauthenticated users", () => {
        beforeEach(() => {
            store.dispatch(signOutRoutine.fulfill());
        });
        testRoute("shows the home page", "/", Home);
        testRoute("shows the public page", "/public", Public);
        testRoute("displays the NotFound component", "/testUrlForNotFound", NotFound);
        testRoute("shows the Login form for the /private path", "/private", SignInForm);
        testRoute("does not show the PrivateComponent for the /private path", "/private", PrivateComponent, 0);
        testRoute("shows the registration form", "/auth/register", SignUpForm);
        testRoute("shows the login form", "/auth/login", SignInForm);

        describe("when the user logs in", () => {
            beforeEach(() => {
                store.dispatch(authRoutine.success());
            });

            it("logs the user in with valid credentials", () => {
                expect(subject()).not.toContainReact(SignInForm);
            });
        });

        it("does not show the logout link", () => {
            history.push("/");
            expect(subject().text()).not.toMatch('Logout');
        });
    });

    describe("for registered users", () => {
        beforeEach(() => {
            store.dispatch(signUpRoutine.success());
        });
        testRoute("shows the confirmation form", "/auth/confirm", ConfirmationForm);
    });

    describe("for authenticated users", () => {
        beforeEach(() => {
            store.dispatch(authRoutine.success());
        });

        testRoute("shows the home page", "/", Home);
        testRoute("shows the public page", "/public", Public);
        testRoute("displays the NotFound component", "/testUrlForNotFound", NotFound);
        testRoute("does not show the Login form for the /private path", "/private", SignInForm, 0);
        testRoute("shows the PrivateComponent for the /private path", "/private", PrivateComponent);
        behavesLikeRouteWithRedirect("/auth/login");
        behavesLikeRouteWithRedirect("/auth/register");
        behavesLikeRouteWithRedirect("/auth/confirm");

        it("logs the user out", () => {
            history.push("/");
            expect(subject().find(SignOutLink).length).toEqual(1);
            store.dispatch(signOutRoutine.fulfill());
            expect(subject().render().find(SignOutLink).length).toEqual(0);
        });
    });
});