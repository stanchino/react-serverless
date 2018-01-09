import React from "react";
import { reduxForm } from "redux-form";

import { signIn } from "../../actions";

import { EmailField, PasswordField } from "../fields"

import wrapWithForm from "./Form";

const SignInForm = wrapWithForm(
    <div className={"form-inputs"}>
        <EmailField />
        <PasswordField />
    </div>
);

export default reduxForm({ form: "signIn", onSubmit: signIn, submitText: "Sign In" })(SignInForm);