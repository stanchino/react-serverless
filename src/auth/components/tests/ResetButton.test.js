import React from "react";
import renderer from "react-test-renderer";

import { ResetButton } from "..";

describe("ResetButton", () => {
    it("matches the snapshot", () => {
        expect(renderer.create(<ResetButton />).toJSON()).toMatchSnapshot();
    });
});