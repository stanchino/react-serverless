import { call, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import { SubmissionError } from "redux-form";

import { signUpRequest } from "../../services";
import { signUpRoutine } from "../../actions";

import { handleSignUpSaga } from "../signUp";

import { finalizeSaga, setupSaga, testServiceFailure, testSignUpSuccess } from "./shared-examples";

const values = { email: "john@doe.com", password: "pass" };
const payload = { payload: { values: values } };

const initializeSaga = () => (
    setupSaga(handleSignUpSaga, payload, signUpRoutine)
);

describe("handleSignUpSaga", () => {
    describe("When the registration is successful", () => {
        const it = initializeSaga();

        it("calls signUpRequest", result => {
            expect(result).toEqual(call(signUpRequest, values.email, values.password));
        });

        it("and triggers the signUp success action", result => {
            testSignUpSuccess(result, undefined);
        });

        it("then redirects to the confirmation URL", result => {
            expect(result).toEqual(put(push("/auth/confirm")));
        });

        finalizeSaga(it, signUpRoutine, { isRegistered: true, email: values.email });
    });

    testServiceFailure(initializeSaga, signUpRequest, signUpRoutine, [values.email, values.password], { isRegistered: false, email: values.email });

    describe("When the user already exists", () => {
        const it = initializeSaga();
        let error = new Error("Error UsernameExistsException");
        error.code = "UsernameExistsException";

        it("calls signUpRequest", result => {
            expect(result).toEqual(call(signUpRequest, values.email, values.password));
            return error;
        });

        it("and then triggers the failure action", result => {
            expect(result).toEqual(put(signUpRoutine.failure(new SubmissionError({
                email: "User already exists.",
                _error: "Error UsernameExistsException"
            }))));
        });

        finalizeSaga(it, signUpRoutine, { isRegistered: true, email: values.email });
    });
});