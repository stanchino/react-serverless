import React from "react";

import { signUp } from "../../actions";

import { EmailField, PasswordField, PasswordConfirmationField } from "../fields"

import { wrapWithForm, connectedForm } from "./Form";

const SignUpForm = wrapWithForm(
    <div className={"form-inputs"}>
        <EmailField autoComplete={"email"}/>
        <PasswordField autoComplete={"new-password"}/>
        <PasswordConfirmationField autoComplete={"new-password"}/>
    </div>
);

export default connectedForm({form: "signUp", onSubmit: signUp, submitText: 'Sign Up', component: SignUpForm });