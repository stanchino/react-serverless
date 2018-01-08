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

const subject = (component = SignInForm) => (
    mount(<Provider store={store}><Protected component={component}><ChildComponent/></Protected></Provider>)
);

describe("Protected Component", () => {
    describe("when the user is not registered", () => {
        it('and the component is not null', () => {
            expect(subject()).toContainReact(<SignInForm />);
        });

        it('and the component is null', () => {
            expect(subject(null)).not.toContainReact(<SignInForm/>);
        })
    });

    it("when the user is logged in", () => {
        store.dispatch(signInRoutine.success());
        expect(subject()).toContainReact(<ChildComponent/>);
    });
});