import { call, put } from "redux-saga/effects";
import { push } from "react-router-redux";

import { signUpRoutine } from "../actions";
import { signUpRequest}  from "../services";
import { formError } from ".";

export function* handleSignUpSaga({ payload: { values: { email, password } } }) {
    let isRegistered = false;
    try {
        yield put(signUpRoutine.request());
        yield call(signUpRequest, email, password);
        yield put(signUpRoutine.success());
        isRegistered = true;
        yield put(push("/auth/confirm"));
    } catch (error) {
        let errors = {
            _error: error.message
        };
        if ("UsernameExistsException" === error.code) {
            isRegistered = true;
            errors.email = "User already exists.";
        }
        yield formError(signUpRoutine, errors);
    } finally {
        yield put(signUpRoutine.fulfill({ isRegistered: isRegistered, email: email }));
    }
}