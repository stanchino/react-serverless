import reducer from "../auth";
import {signUpRoutine, confirmationRoutine, signOutRoutine, signInRoutine} from "../../actions";

const testAction = (reducer, action, expectedState) => {
    it(`should handle ${action.type}`, () => {
        expect(reducer({}, action)).toEqual(expectedState);
    });
};

const behavesLikeReducerWithPayload = (routine, success, failure) => {
    testAction(reducer, routine.request(), {
        loading: true
    });

    testAction(reducer, routine.success('payload'), {
        ...success,
        profile: 'payload'
    });

    testAction(reducer, routine.failure(), failure);

    testAction(reducer, routine.fulfill(), {
        loading: false
    });
};

const behavesLikeReducerWithoutPayload = (routine, success, failure) => {
    testAction(reducer, routine.request(), {
        loading: true
    });

    testAction(reducer, routine.success(), success);

    testAction(reducer, routine.failure(), failure);

    testAction(reducer, routine.fulfill(), {
        loading: false
    });
};

describe("auth reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            isLoggedIn: false,
            isRegistered: false,
            isConfirmed: false,
            profile: null
        });
    });

    describe("for the signUpRoutine", () => behavesLikeReducerWithPayload(signUpRoutine, { isRegistered: true }, { isRegistered: false }));
    describe("for the confirmationRoutine", () => behavesLikeReducerWithoutPayload(confirmationRoutine, { isConfirmed: true }, { isConfirmed: false }));
    describe("for the signUpRoutine", () => behavesLikeReducerWithPayload(signInRoutine, { isLoggedIn: true }, { isLoggedIn: false }));
    describe("for the signOutRoutine", () => {
        testAction(reducer, signOutRoutine.request(), {
            loading: true
        });

        testAction(reducer, signOutRoutine.fulfill(), {
            loading: false,
            isLoggedIn: false,
            isRegistered: false,
            isConfirmed: false,
            profile: null
        });
    });
});