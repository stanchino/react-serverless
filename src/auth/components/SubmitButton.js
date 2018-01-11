import React from "react";

export default ({ pristine, submitting, children }) => (
    <button type={"submit"} disabled={pristine || submitting}>{children}</button>
);