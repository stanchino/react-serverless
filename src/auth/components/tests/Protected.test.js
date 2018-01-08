import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import createMemoryHistory from "history/createBrowserHistory";

import configureStore from "../../../stores/index";

import { Protected, SignInForm }  from "../index";
import { signInRoutine } from "../../actions/index";

const history = createMemoryHistory();
const { store } = configureStore(history);

const ChildComponent = () => (<div/>);

const subject = () => (
    mount(<Provider store={store}><Protected component={SignInForm}><ChildComponent/></Protected></Provider>)
);

describe("Protected Component", () => {
    it("when the user is not registered", () => {
        expect(subject()).toContainReact(<SignInForm />);
    });

    it("when the user is logged in", () => {
        store.dispatch(signInRoutine.success());
        expect(subject()).toContainReact(<ChildComponent/>);
    });
});