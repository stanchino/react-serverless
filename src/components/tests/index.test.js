import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

import { Home, Public, PrivateComponent, Private, NotFound } from "..";

const initialState = { isLoggedIn: false, flash: { error: null, notice: null } };
const mockStore = configureStore();

const testComponent = (description, component) => {
    it(description, () => expect(renderer.create(component).toJSON()).toMatchSnapshot());
};

describe("components", () => {
    testComponent("renders Home without errors", Home);
    testComponent("renders Public without errors", Public);
    testComponent("renders PrivateComponent without errors", PrivateComponent);
    testComponent("renders NotFound without errors", NotFound);
});

describe("Private", () => {
    describe("for unauthenticated users", () => {
        const store = mockStore({ auth: initialState });

        it("will not show the private contents", () => {
            expect(mount(<Provider store={store}>{Private}</Provider>)).not.toContainReact(PrivateComponent);
        });
    });

    describe("for authenticated users", () => {
        const store = mockStore({ auth: { ...initialState, isLoggedIn: true } });

        it("will show the private contents", () => {
            expect(mount(<Provider store={store}>{Private}</Provider>)).toContainReact(PrivateComponent);
        });
    });
});