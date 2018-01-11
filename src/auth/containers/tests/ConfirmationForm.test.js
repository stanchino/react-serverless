import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch, Route } from "react-router";

import createMemoryHistory from "history/createBrowserHistory";
import { mount } from "enzyme";

import configureStore from "../../../stores/index";
import { matchSnapshot, renderFormErrors } from "./shared-examples";

import { ConfirmationForm } from "..";

import { signUpRoutine } from "../../actions";

const history = createMemoryHistory();
const store = configureStore(history);

describe("ConfirmationForm", () => {
    describe("when the user is not registered", () => {
        store.dispatch(signUpRoutine.fulfill());
        const subject = mount(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path={"/"} render={() => (<div/>)} />
                        <Route exact path={"/auth/confirm"} component={ConfirmationForm} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        history.push("/");

        it("redirects to the registration page", () => {
            history.push("/auth/confirm");
            expect(subject.find("input[name='code']")).toBeEmpty();
            expect(history.location.pathname).toEqual("/auth/register");
        })
    });

    describe("when the user is registered", () => {
        beforeEach(() => {
            store.dispatch(signUpRoutine.success());
        });

        matchSnapshot(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <ConfirmationForm />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        it("submits the form", () => {
            const spy = jest.fn();
            const subject = mount(
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <ConfirmationForm onSubmit={spy}/>
                        </Switch>
                    </ConnectedRouter>
                </Provider>
            );
            subject.find("input[name='code']").simulate("change", { target: { value: "1234" } });
            subject.find("form").simulate("submit");
            expect(spy.mock.calls.length).toEqual(1)
        });

        renderFormErrors(ConfirmationForm, store, history, { _error: "error message" });
    });
});