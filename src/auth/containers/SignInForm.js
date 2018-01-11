import React from "react";
import { reduxForm } from "redux-form";

import { signIn, signInRoutine } from "../actions";

import { Email, Password, Messages, SubmitButton, ResetButton, ActionButton } from "../components";

const SignInForm = ({ error, handleSubmit, onSubmit, resetPassword, ...props }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Messages error={error} />
        <Email autoComplete={"email"} />
        <Password autoComplete={"new-password"} />
        <ActionButton onClick={resetPassword}>Forgotten Password?</ActionButton>
        <SubmitButton {...props}>Sign In</SubmitButton>
        <ResetButton {...props}>Cancel</ResetButton>
    </form>
);

export default reduxForm({ form: "signIn", onSubmit: signIn, resetPassword: signInRoutine })(SignInForm);