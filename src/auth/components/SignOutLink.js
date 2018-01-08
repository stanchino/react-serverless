import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOutRoutine } from "../actions";

const Logout = ({ children, actions, ...props }) => (
    <button {...props} onClick={actions.signOutRoutine}>{children}</button>
);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ signOutRoutine }, dispatch),
});

export default connect(null, mapDispatchToProps)(Logout);