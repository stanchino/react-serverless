import React from "react";
import { connect } from "react-redux";
import { errorStyle, noticeStyle } from "./styles";

const Flash = ({ flash: { error, notice }}) => (
    <div className={"flash"}>
        {error && <div style={errorStyle}><strong>{error}</strong></div>}
        {notice && <div style={noticeStyle}><strong>{notice}</strong></div>}
    </div>
);

const mapStateToProps = state => ({
    flash: state.auth.flash
});

export default connect(mapStateToProps)(Flash);