import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import createStore from "redux-mock-store";

import { initialState } from "../../reducers/auth";
import { AuthForm } from "../..";

const mockStore = createStore();
const store = mockStore({ auth: initialState });

export const matchFormSnapshot = Component => expect(renderer.create(
    <Provider store={store}>
        <AuthForm form={"test"} onSubmit={jest.fn()}>
            <Component />
        </AuthForm>
    </Provider>
).toJSON()).toMatchSnapshot();

export const matchSnapshot = (Component, props = {}) => expect(renderer.create(
    <Component {...props} />
).toJSON()).toMatchSnapshot();