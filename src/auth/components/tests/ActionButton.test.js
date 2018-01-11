import React from "react";
import renderer from "react-test-renderer";

import { ActionButton } from "..";

describe("ActionButton", () => {
    it("matches the snapshot", () => {
        expect(renderer.create(<ActionButton />).toJSON()).toMatchSnapshot();
    });
});