import { call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";

import { confirmationRoutine } from "../actions";
import { confirmationRequest } from "../services";

import { formError } from ".";

export const getEmail = state => (state.auth.signUp.email);

export function* handleConfirmationSaga({ payload: { values: { code } } }) {
    try {
        const email = yield select(getEmail);
        yield put(confirmationRoutine.request());
        yield call(confirmationRequest, email, code);
        yield put(confirmationRoutine.success());
        yield put(push("/auth/login"));
    } catch (error) {
        yield formError(confirmationRoutine, {
            code: "Invalid code",
            _error: error.message
        });
    } finally {
        yield put(confirmationRoutine.fulfill());
    }
}