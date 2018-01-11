import React from "react";
import renderer from "react-test-renderer";

import { SubmitButton } from "..";

describe("SubmitButton", () => {
    it("matches the snapshot", () => {
        expect(renderer.create(<SubmitButton />).toJSON()).toMatchSnapshot();
    });
});