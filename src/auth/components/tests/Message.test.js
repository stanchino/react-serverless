import React from "react";
import renderer from "react-test-renderer";

import { Message } from "..";

describe("Message", () => {
    it("matches the snapshot", () => {
        expect(renderer.create(<Message />).toJSON()).toMatchSnapshot();
    });
});