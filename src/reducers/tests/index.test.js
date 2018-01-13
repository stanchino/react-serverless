import { createStore } from "redux";
import rootReducer from "..";

const store = createStore(rootReducer);

describe("combines reducers", () => {
    it("and sets the auth state", () => expect(undefined !== store.getState().auth).toBeTruthy());
    it("and sets the form state", () => expect(undefined !== store.getState().form).toBeTruthy());
    it("and sets the router state", () => expect(undefined !== store.getState().router).toBeTruthy());
});