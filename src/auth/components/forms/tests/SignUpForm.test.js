import React from "react";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";

import { mount } from "enzyme";

import { matchSnapshot, renderFormErrors } from "./shared-examples";

import configureStore from "../../../../stores";

import { SignUpForm } from "../";

const history = createMemoryHistory();
const store = configureStore(history);

describe("SignUpForm", () => {
    const spy = jest.fn();
    const subject = mount(<Provider store={store}><SignUpForm onSubmit={spy}/></Provider>);

    matchSnapshot(<Provider store={store}><SignUpForm /></Provider>);

    it("submits the form", () => {
        subject.find("input[name='email']").simulate("change", { target: { value: "john@doe.com" } });
        subject.find("input[name='password']").simulate("change", { target: { value: "test1234" } });
        subject.find("input[name='password_confirmation']").simulate("change", { target: { value: "test1234" } });
        subject.find("form").simulate("submit");
        expect(spy).toHaveBeenCalled()
    });

    renderFormErrors(SignUpForm, store, { email: "Invalid User", _error: "SignUp Form Error"});
});