import React from "react";
import { mount } from "enzyme";
import { reduxForm } from "redux-form";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";

import configureStore from "../../../../stores";

import wrapWithForm from "../Form";
import { matchSnapshot, renderFormErrors } from "./shared-examples";

const history = createMemoryHistory();
const store = configureStore(history);

const FormComponent = wrapWithForm(<div/>);
const Form = reduxForm({ form: 'test', onSubmit: jest.fn() })(FormComponent);

describe("Form", () => {
    matchSnapshot(<Provider store={store}><Form/></Provider>);

    it("submits the form", () => {
        const spy = jest.fn();
        const subject = mount(<Provider store={store}><Form onSubmit={spy}/></Provider>);
        subject.find("form").simulate("submit");
        expect(spy.mock.calls.length).toEqual(1)
    });

    renderFormErrors(Form, store, { _error: "error message" });
});