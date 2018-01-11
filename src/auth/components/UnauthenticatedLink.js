import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const LoginLink = ({ isLoggedIn, loading, ...props }) => (
    loading || isLoggedIn ? null : <NavLink {...props} />
);

export default connect(state => ({
    loading: state.auth.loading,
    isLoggedIn: state.auth.isLoggedIn,
}), () => ({}))(LoginLink);