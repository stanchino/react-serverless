import { combineReducers } from "redux";
import { reducer as formReducer  } from "redux-form";
import signIn from "./signIn";
import signUp from "./signUp";

const authReducers = { signIn, signUp };

export default {
    auth: combineReducers(authReducers),
    form: formReducer
};