import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import createStore from "redux-mock-store";

import { AuthForm } from "..";

const store = createStore()({ auth: { flash: {} } });

describe("Flash", () =>{
    it("matches the snapshot", () => {
        expect(renderer.create(<Provider store={store}><AuthForm form={"test"} onSubmit={jest.fn()} /></Provider>).toJSON()).toMatchSnapshot();
    });
});