import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router";

import { confirmation } from "../actions/index";

import { FormField, Messages, SubmitButton, ResetButton, ActionButton } from "../components";

const ConfirmationComponent = ({ error, handleSubmit, onSubmit, newCode, ...props }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Messages error={error} />
        <Field component={FormField} type="text" name="code" placeholder="Confirmation Code"/>
        <ActionButton onClick={newCode}>Request New Code</ActionButton>
        <SubmitButton {...props}>Confirm</SubmitButton>
        <ResetButton {...props}>Reset</ResetButton>
    </form>
);

const RegisteredOnlyComponent = ({ isRegistered, ...props }) => (
    isRegistered ? <ConfirmationComponent {...props} /> : <Redirect to={"/auth/register"} />
);

const ConnectedComponent = connect(state => ({
    isRegistered: state.auth.isRegistered
}))(RegisteredOnlyComponent);

export default reduxForm({ form: "confirmation", onSubmit: confirmation, newCode: confirmation })(ConnectedComponent);