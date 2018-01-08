import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const LoginLink = ({ isLoggedIn, dispatch, ...props }) => (
    isLoggedIn ? null : <NavLink {...props} />
);

export default connect(state => ({
    isLoggedIn: state.auth.signIn.isLoggedIn,
}))(LoginLink);