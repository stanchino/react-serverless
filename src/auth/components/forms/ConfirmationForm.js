import React from "react";
import { Field, reduxForm } from "redux-form";

import { confirmation } from "../../actions";

import wrappedWithForm from "./Form";
import { FormField } from "../fields";

const ConfirmationComponent = wrappedWithForm(
    <Field component={FormField} type="text" name="code" placeholder="Confirmation Code"/>
);

export default reduxForm({form: "confirmation", onSubmit: confirmation, submitText: "Confirm"})(ConfirmationComponent);