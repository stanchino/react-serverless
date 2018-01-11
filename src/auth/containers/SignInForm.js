import React from "react";

import { signIn, signInRoutine } from "../actions";

import { ActionButton, Email, Form, Password, ResetButton, SubmitButton } from "../components";

import connectForm from "./Form";

const SignInForm = ({resetPassword, ...props }) => (
    <Form {...props}>
        <Email autoComplete={"email"} />
        <Password autoComplete={"new-password"} />
        <ActionButton onClick={resetPassword}>Forgotten Password?</ActionButton>
        <SubmitButton {...props}>Sign In</SubmitButton>
        <ResetButton {...props}>Cancel</ResetButton>
    </Form>
);

export default connectForm({ form: "signIn", onSubmit: signIn, resetPassword: signInRoutine })(SignInForm);