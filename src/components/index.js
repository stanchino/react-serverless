import React from "react";
import { Route, Redirect } from "react-router";

import {
    ActionButton,
    ConfirmationCode,
    Email,
    Password,
    PasswordConfirmation,
    Protected,
    ResetButton,
    SignInForm as SignIn,
    SignUpForm as SignUp,
    ConfirmationForm as Confirmation,
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
    <SignIn>
        <Email autoComplete={"email"} />
        <Password autoComplete={"new-password"} />
        <ActionButton>Forgotten Password?</ActionButton>
        <SubmitButton>Sign In</SubmitButton>
        <ResetButton>Cancel</ResetButton>
    </SignIn>
);

export const SignUpForm = (
    <SignUp>
        <Email autoComplete={"email"}/>
        <Password autoComplete={"new-password"}/>
        <PasswordConfirmation autoComplete={"new-password"}/>
        <SubmitButton>Sign Up</SubmitButton>
        <ResetButton>Cancel</ResetButton>
    </SignUp>
);

export const ConfirmationForm = (
    <Confirmation>
        <ConfirmationCode />
        <ActionButton>Request New Code</ActionButton>
        <SubmitButton>Confirm</SubmitButton>
        <ResetButton>Reset</ResetButton>
    </Confirmation>
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


