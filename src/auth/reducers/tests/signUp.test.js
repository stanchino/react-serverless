import reducer from "../signUp";
import { signUpRoutine, confirmationRoutine } from "../../actions";

import { testAction } from "./shared-examples";

describe("signUp reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            isRegistered: false,
            isConfirmed: false,
            email: null
        });
    });

    describe("for the signUpRoutine", () => {
        testAction(reducer, signUpRoutine.request(), {
            loading: true
        });

        testAction(reducer, signUpRoutine.success(), {
            isRegistered: true
        });

        testAction(reducer, signUpRoutine.failure(), {
            isRegistered: false
        });

        testAction(reducer, signUpRoutine.fulfill({ isRegistered: true, email: "john@doe.com" }), {
            loading: false, isRegistered: true, email: "john@doe.com"
        });
    });

    describe("for the confirmationRoutine", () => {
        testAction(reducer, confirmationRoutine.request(), {
            loading: true
        });

        testAction(reducer, confirmationRoutine.success(), {
            isConfirmed: true
        });

        testAction(reducer, confirmationRoutine.failure(), {
            isConfirmed: false
        });

        testAction(reducer, confirmationRoutine.fulfill(), {
            loading: false
        });
    });
});