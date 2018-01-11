import React from "react";
import { reduxForm } from "redux-form";

import { signUp } from "../actions";

import { Email, Password, PasswordConfirmation, Messages, SubmitButton, ResetButton } from "../components";

const SignUpForm = ({ error, handleSubmit, onSubmit, ...props }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Messages error={error} />
        <Email autoComplete={"email"}/>
        <Password autoComplete={"new-password"}/>
        <PasswordConfirmation autoComplete={"new-password"}/>
        <SubmitButton {...props}>Sign Up</SubmitButton>
        <ResetButton {...props}>Cancel</ResetButton>
    </form>
);

export default reduxForm({form: "signUp", onSubmit: signUp })(SignUpForm);