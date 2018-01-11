import { reduxForm } from "redux-form";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.auth.isRegistered
});

export default props => component => (
    reduxForm(props)(connect(mapStateToProps)(component))
);