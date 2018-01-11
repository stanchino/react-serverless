import React from "react";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";
import { mount } from "enzyme";

import { matchSnapshot, renderFormErrors } from "./shared-examples";

import configureStore from "../../../../stores";
import { SignInForm } from "..";

const history = createMemoryHistory();
const store = configureStore(history);

describe("SignInForm", () => {
    const spy = jest.fn();
    const subject = mount(<Provider store={store}><SignInForm onSubmit={spy}/></Provider>);

    matchSnapshot(<Provider store={store}><SignInForm /></Provider>);

    it("submits the form", () => {
        subject.find("input[name='email']").simulate("change", { target: { value: "john@doe.com" } });
        subject.find("input[name='password']").simulate("change", { target: { value: "test1234" } });
        subject.find("form").simulate("submit");
        expect(spy.mock.calls.length).toEqual(1)
    });

    renderFormErrors(SignInForm, store, history, { email: "Invalid User", _error: "SignIn Form Error"});
});