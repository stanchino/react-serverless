import React from "react";

import { Messages } from ".";

export default ({ loading, error, handleSubmit, onSubmit, children }) => (
    loading ?
        "Loading..." :
        <form onSubmit={handleSubmit(onSubmit)}>
            <Messages error={error} />
            {children}
        </form>
);