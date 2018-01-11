import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import { matchSnapshot } from "./shared-examples";
import { initialState } from "../../reducers/auth";

import { SignInForm } from "..";

const mockStore = configureStore();

describe("SignInForm", () => {
    const spy = jest.fn();
    const store = mockStore({ auth: initialState });
    const subject = mount(<Provider store={store}><SignInForm onSubmit={spy}/></Provider>);

    matchSnapshot(<Provider store={store}><SignInForm /></Provider>);

    it("submits the form", () => {
        subject.find("input[name='email']").simulate("change", { target: { value: "john@doe.com" } });
        subject.find("input[name='password']").simulate("change", { target: { value: "test1234" } });
        subject.find("form").simulate("submit");
        expect(spy.mock.calls.length).toEqual(1)
    });
});