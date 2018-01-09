import { call } from "redux-saga/effects";
import { signOutRoutine } from "../../actions";
import { signOutRequest } from "../../services";
import { handleSignOutSaga } from "../signOut";

import { finalizeSaga, setupSaga } from "./shared-examples";

const payload = {};

const initializeSaga = () => (
    setupSaga(handleSignOutSaga, payload, signOutRoutine)
);

describe("handleSignOutSaga", () => {
    describe("Signs the user out and always succeeds", () => {
        const it = initializeSaga();

        it("calls signOutRequest", result => {
            expect(result).toEqual(call(signOutRequest));
        });

        finalizeSaga(it, signOutRoutine);
    });
});