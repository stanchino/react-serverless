import React from "react";

import { signUp } from "../actions";

import { Email, Form, Password, PasswordConfirmation, ResetButton, SubmitButton } from "../components";

import connectForm from "./Form";

const SignUpForm = ({ ...props }) => (
    <Form {...props}>
        <Email autoComplete={"email"}/>
        <Password autoComplete={"new-password"}/>
        <PasswordConfirmation autoComplete={"new-password"}/>
        <SubmitButton {...props}>Sign Up</SubmitButton>
        <ResetButton {...props}>Cancel</ResetButton>
    </Form>
);

export default connectForm({form: "signUp", onSubmit: signUp })(SignUpForm);