import React from "react";
import { reduxForm } from "redux-form";

import { signUp } from "../../actions";

import { EmailField, PasswordField, PasswordConfirmationField } from "../fields"

import wrapWithForm from "./Form";

const SignUpForm = wrapWithForm(
    <div className={"form-inputs"}>
        <EmailField />
        <PasswordField />
        <PasswordConfirmationField />
    </div>
);

export default reduxForm({form: "signUp", onSubmit: signUp, submitText: 'Sign Up'})(SignUpForm);