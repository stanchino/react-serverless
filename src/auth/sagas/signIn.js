import { call, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import { signInRoutine, signUpRoutine } from "../actions";
import { signInRequest, userAttributes } from "../services";
import { formError } from ".";

export function* handleSignInSaga({ payload: { values: { email, password } } }) {
    try {
        yield put(signInRoutine.request());
        const { user } = yield call(signInRequest, email, password);
        const profile = yield call(userAttributes, user);
        yield put(signInRoutine.success(profile));
    } catch (error) {
        if ("UserNotConfirmedException" === error.code) {
            yield put(signUpRoutine.success({ email: email }));
            yield put(push("/auth/confirm"));
        } else {
            yield formError(signInRoutine, {
                email: "Invalid user.",
                _error: error.message
            });
        }
    } finally {
        yield put(signInRoutine.fulfill())
    }
}