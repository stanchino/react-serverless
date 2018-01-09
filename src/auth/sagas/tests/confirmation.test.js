import { call, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import { confirmationRoutine } from "../../actions";
import { confirmationRequest } from "../../services";

import { handleConfirmationSaga, getProfile } from "../confirmation";

import { finalizeSaga, setupSelectSaga, testSelector, testServiceFailure } from "./shared-examples";

const values = { code: "1234" };
const payload = { payload: { values: values } };

const initializeSaga = () => (
    setupSelectSaga(handleConfirmationSaga, payload, confirmationRoutine, getProfile, { email: "john@doe.com" })
);

describe("handleConfirmationSaga", () => {
    describe("When confirmation is successful", () => {
        const it = initializeSaga();

        it("calls confirmationRequest", result => {
            expect(result).toEqual(call(confirmationRequest, "john@doe.com", values.code));
        });

        it("and then triggers the confirmation success action", result => {
            expect(result).toEqual(put(confirmationRoutine.success()));
        });

        it("then redirects to the login URL", result => {
            expect(result).toEqual(put(push("/auth/login")));
        });

        finalizeSaga(it, confirmationRoutine);
    });

    testServiceFailure(initializeSaga, confirmationRequest, confirmationRoutine, ["john@doe.com", values.code]);
});

testSelector(getProfile, { auth: { profile: { email: "john@doe.com" } }}, { email: "john@doe.com" });