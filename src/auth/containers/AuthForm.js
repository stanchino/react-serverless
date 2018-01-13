import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { Form } from "../components";

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.auth.isRegistered
});

export const connectForm = props => component => (
    reduxForm({ propNamespace: 'form', ...props })(connect(mapStateToProps)(component))
);

export default props => (
    React.createElement(connectForm(props)(connect(mapStateToProps)(Form)))
);