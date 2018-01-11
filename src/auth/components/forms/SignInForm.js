import React from "react";

import { signIn } from "../../actions";

import { EmailField, PasswordField } from "../fields"

import { wrapWithForm, connectedForm } from "./Form";

const SignInForm = wrapWithForm(
    <div className={"form-inputs"}>
        <EmailField autoComplete={"email"} />
        <PasswordField autoComplete={"new-password"} />
    </div>
);

export default connectedForm({ form: "signIn", onSubmit: signIn, submitText: "Sign In", component: SignInForm });