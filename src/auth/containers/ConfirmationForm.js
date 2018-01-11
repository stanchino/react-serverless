import React from "react";
import { Field } from "redux-form";
import { Redirect } from "react-router";

import { confirmation } from "../actions";

import { ActionButton, Form, FormField, ResetButton, SubmitButton } from "../components";

import connectForm from "./Form";

const ConfirmationComponent = ({ newCode, ...props }) => (
    <Form {...props}>
        <Field component={FormField} type="text" name="code" placeholder="Confirmation Code"/>
        <ActionButton onClick={newCode}>Request New Code</ActionButton>
        <SubmitButton {...props}>Confirm</SubmitButton>
        <ResetButton {...props}>Reset</ResetButton>
    </Form>
);

const RegisteredOnlyComponent = ({ isRegistered, ...props }) => (
    isRegistered ? <ConfirmationComponent {...props} /> : <Redirect to={"/auth/register"} />
);

export default connectForm({ form: "confirmation", onSubmit: confirmation, newCode: confirmation })(RegisteredOnlyComponent);