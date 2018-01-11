import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import createMemoryHistory from "history/createBrowserHistory";
import configureStore from "../../../stores";

import { signOutRoutine } from "../../actions";

import { SignOutLink } from "..";

const history = createMemoryHistory();
const store = configureStore(history);

describe("SignOutLink Component", () => {
    const expectButton = () => (expect(mount(<Provider store={store}><SignOutLink /></Provider>).find("button")));
    it("when data is loading", () => {
        store.dispatch(signOutRoutine.request());
        expectButton().toBeEmpty();
    });

    it("when data is loaded", () => {
        store.dispatch(signOutRoutine.fulfill());
        expectButton().toBePresent();
    })
});