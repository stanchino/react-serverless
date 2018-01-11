import React from "react";
import { reduxForm } from "redux-form";

import { errorStyle } from "../styles";
import Flash from "../Flash";

const Form = ({ error, handleSubmit, onSubmit, pristine, reset, submitting, children, submitText = "Save" }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        {!error && <Flash />}
        {error && <div style={errorStyle}><strong>{error}</strong></div>}
        {children}
        <button type={"submit"} disabled={pristine || submitting}>{submitText}</button>
        <button type={"reset"} disabled={pristine || submitting} onClick={reset}>Cancel</button>
    </form>
);

export const wrapWithForm = children => props => (
    <Form {...props} children={children} />
);

export const connectedForm = ({ component, ...params }) => reduxForm(params)(component);