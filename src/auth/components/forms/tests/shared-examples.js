import React from 'react';
import { mount } from "enzyme";

import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { SubmissionError } from "redux-form";

export const matchSnapshot = (component) => {
    it("matches the snapshot", () => {
        const snapshot = renderer.create(component).toJSON();
        expect(snapshot).toMatchSnapshot();
    });
};

export const renderFormErrors = (Component, store, errors) => {
    it("renders errors", () => {
        const subject = mount(<Provider store={store}><Component onSubmit={() => { throw new SubmissionError(errors) } }/></Provider>);
        subject.find("form").simulate("submit");
        Object.values(errors).forEach(message => {
            expect(subject.text()).toMatch(message);
        });
    });
};