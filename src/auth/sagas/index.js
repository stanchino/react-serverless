import {takeEvery, put } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import { routinePromiseWatcherSaga } from "redux-saga-routines";

import { signUpRoutine, confirmationRoutine, signInRoutine, authRoutine, signOutRoutine } from "../actions";
import { handleSignUpSaga } from "./signUp";
import { handleConfirmationSaga } from "./confirmation";
import { handleSignInSaga } from "./signIn";
import { handleAuthSaga } from "./auth";
import { handleSignOutSaga } from "./signOut";

function* signUpWatcher() {
    yield takeEvery(signUpRoutine.TRIGGER, handleSignUpSaga);
}

function* confirmationWatcher() {
    yield takeEvery(confirmationRoutine.TRIGGER, handleConfirmationSaga);
}

function* signInWatcher() {
    yield takeEvery(signInRoutine.TRIGGER, handleSignInSaga);
}

function* authWatcher() {
    yield takeEvery(authRoutine.TRIGGER, handleAuthSaga);
}

function* signOutWatcher() {
    yield takeEvery(signOutRoutine.TRIGGER, handleSignOutSaga);
}

export const formError = (action, errors) => (
    put(action.failure(new SubmissionError(errors)))
);

export default [routinePromiseWatcherSaga, signUpWatcher, confirmationWatcher, signInWatcher, authWatcher, signOutWatcher];