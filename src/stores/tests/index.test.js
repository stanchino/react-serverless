import createHistory from "history/createMemoryHistory";
import createStore from "..";

const history = createHistory();

describe("creates the store", () => {
   it ("exports a valid store", () => {
       expect(undefined !== createStore(history).dispatch).toBeTruthy();
       expect(undefined !== createStore(history).getState).toBeTruthy();
       expect(undefined !== createStore(history).replaceReducer).toBeTruthy();
       expect(undefined !== createStore(history).subscribe).toBeTruthy();
   })
});