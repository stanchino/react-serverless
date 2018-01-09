import { call, put } from "redux-saga/effects";
import { signOutRoutine } from "../actions";
import { signOutRequest } from "../services";

export function* handleSignOutSaga() {
    try {
        yield put(signOutRoutine.request());
        yield call(signOutRequest);
    } finally {
        yield put(signOutRoutine.fulfill())
    }
}