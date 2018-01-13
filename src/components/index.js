import React from "react";
import { Route, Redirect } from "react-router";

import { signIn, signUp, confirmation } from "../auth/actions";
import {
    ActionButton,
    AuthForm,
    ConfirmationCode,
    Email,
    Password,
    PasswordConfirmation,
    Protected,
    ResetButton,
    SubmitButton,
} from "../auth";

export const RouteWithRedirect = ({ path , to, ...props }) => (
    <Route path={path}>
        <Protected {...props}>
            <Redirect to={to}/>
        </Protected>
    </Route>
);

export const Home = (
    <div>Home</div>
);

export const Public = (
    <div>Public</div>
);

export const PrivateComponent = (
    <div>Private</div>
);

export const SignInForm = (
    <AuthForm form={"signIn"} onSubmit={signIn}>
        <Email autoComplete={"email"} />
        <Password autoComplete={"new-password"} />
        <ActionButton>Forgotten Password?</ActionButton>
        <SubmitButton>Sign In</SubmitButton>
        <ResetButton>Cancel</ResetButton>
    </AuthForm>
);

export const SignUpForm = (
    <AuthForm form={"signUp"} onSubmit={signUp}>
        <Email autoComplete={"email"}/>
        <Password autoComplete={"new-password"}/>
        <PasswordConfirmation autoComplete={"new-password"}/>
        <SubmitButton>Sign Up</SubmitButton>
        <ResetButton>Cancel</ResetButton>
    </AuthForm>
);

export const ConfirmationForm = (
    <AuthForm form={"confirmation"} onSubmit={confirmation}>
        <ConfirmationCode />
        <ActionButton>Request New Code</ActionButton>
        <SubmitButton>Confirm</SubmitButton>
        <ResetButton>Reset</ResetButton>
    </AuthForm>
);

export const Private = (
    <Protected component={SignInForm}>
        {PrivateComponent}
    </Protected>
);

export const NotFound = (
    <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
);


