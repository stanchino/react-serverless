import React from "react";

export default ({ pristine, submitting, reset, children }) => (
    <button type={"reset"} disabled={pristine || submitting} onClick={reset}>{children}</button>
);