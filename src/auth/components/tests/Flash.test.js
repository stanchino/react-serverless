import React from "react";
import { mount } from "enzyme";
import createMemoryHistory from "history/createBrowserHistory";
import configureStore from "../../../stores";

import { signInRoutine } from "../../actions";

import Flash  from "../Flash";

const history = createMemoryHistory();
const store = configureStore(history);

const subject = () => (mount(<Flash store={store}/>));

const matchFlash = (payload, text) => {
    describe("when the flash is set", () => {
        beforeEach(() => {
            store.dispatch(signInRoutine.success(payload));
        });
        it("shows the message", () => {
            expect(subject().text()).toMatch(text);
        })
    });
};

describe("Flash Component", () => {
    matchFlash({ flash: { error: 'error' } }, "error");
    matchFlash({ flash: { notice: 'notice' } }, "notice");
});