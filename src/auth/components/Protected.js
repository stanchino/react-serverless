import React from "react";
import { connect } from "react-redux";
import mapStateToProps from "../reducers/stateToProps";

const ProtectedComponent = ({ isLoggedIn, children, component }) => (
    isLoggedIn ? children : React.createElement(component)
);

export default connect(mapStateToProps)(ProtectedComponent);