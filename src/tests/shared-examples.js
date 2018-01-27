import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createMemoryHistory";

import { mount } from "enzyme";

export const history = createHistory();

export default (Component, store) => (
    mount(<Provider store={store}><ConnectedRouter history={history}><Component /></ConnectedRouter></Provider>)
);