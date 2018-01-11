import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router";

import { confirmation } from "../../actions";

import { wrapWithForm } from "./Form";

import { FormField } from "../fields";

const ConfirmationComponent = wrapWithForm(
    <Field component={FormField} type="text" name="code" placeholder="Confirmation Code"/>
);

const RegisteredOnlyConfirmation = ({ isRegistered, ...props }) => (
    isRegistered ? <ConfirmationComponent {...props} /> : <Redirect to={"/auth/register"} />
);

const ConnectedConfirmationComponent = connect(state => ({
    isRegistered: state.auth.isRegistered
}))(RegisteredOnlyConfirmation);

export default reduxForm({form: "confirmation", onSubmit: confirmation, submitText: "Confirm"})(ConnectedConfirmationComponent);