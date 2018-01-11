import React from "react";
import { connect } from "react-redux";

import { Message } from "../components";

const Flash = ({ flash: { error, notice } }) => (
    <div className={"flash"}>
        <Message message={error} style={{ color: "red" }} />
        <Message message={notice} style={{ color: "green" }} />
    </div>
);

const mapStateToProps = state => ({
    flash: state.auth.flash
});

export default connect(mapStateToProps)(Flash);