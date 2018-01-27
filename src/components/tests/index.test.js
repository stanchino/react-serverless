import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import connectComponent from "../../tests/shared-examples";

import {
    Home,
    PasswordResetRequestForm,
    PasswordResetConfirmForm,
    Private,
    PrivateComponent,
    Public,
    NotFound
} from "..";

const initialState = { isLoggedIn: false, flash: { error: null, notice: null } };
const mockStore = configureStore();

const testComponent = (description, component) => {
    it(description, () => expect(renderer.create(component).toJSON()).toMatchSnapshot());
};

describe("components", () => {
    testComponent("renders Home without errors", <Home />);
    testComponent("renders Public without errors", <Public />);
    testComponent("renders PrivateComponent without errors", <PrivateComponent />);
    testComponent("renders NotFound without errors", <NotFound />);
});

describe("containers", () => {
    const store = mockStore({ auth: initialState });
    testComponent("renders PasswordResetRequestForm without errors", <Provider store={store}><PasswordResetRequestForm /></Provider>);
    testComponent("renders PasswordResetConfirmationForm without errors", <Provider store={store}><PasswordResetConfirmForm /></Provider>);
});

describe("Private Component", () => {
    const subject = store => connectComponent(Private, store);

    describe("for unauthenticated users", () => {
        const store = mockStore({ auth: initialState });

        it("will not show the private contents", () => {
            expect(subject(store)).not.toContainReact(<PrivateComponent />);
        });
    });

    describe("for authenticated users", () => {
        const store = mockStore({ auth: { ...initialState, isLoggedIn: true } });

        it("will show the private contents", () => {
            expect(subject(store)).toContainReact(<PrivateComponent />);
        });
    });
});