import React from "react";
import { connect } from "react-redux";
import mapStateToProps from "../reducers/stateToProps";

const componentOrNull = component => (
    component ? React.createElement(component) : null
);

const ProtectedComponent = ({ isLoggedIn, children, component }) => (
    isLoggedIn ? children : componentOrNull(component)
);

export default connect(mapStateToProps)(ProtectedComponent);