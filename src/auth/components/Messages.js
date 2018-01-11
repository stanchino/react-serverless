import React from "react";

import { Message } from ".";

import { Flash } from "../containers";

export default ({ error }) => (
    <div className={"messages"}>
        {!error && <Flash />}
        <Message message={error} style={{ color: "red" }} />
    </div>
);