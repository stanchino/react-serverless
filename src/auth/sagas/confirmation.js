import { call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";

import { confirmationRoutine } from "../actions";
import { confirmationRequest } from "../services";

import { formError } from ".";

export const getProfile = state => ({ ...state.auth.profile });

export function* handleConfirmationSaga({ payload: { values: { code } } }) {
    try {
        const { email } = yield select(getProfile);
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