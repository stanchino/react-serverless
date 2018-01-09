import { signUpRoutine, signInRoutine, confirmationRoutine, signOutRoutine } from "../actions";

const initialState = {
    loading: false,
    isLoggedIn: false,
    isRegistered: false,
    isConfirmed: false,
    profile: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case signUpRoutine.REQUEST:
        case confirmationRoutine.REQUEST:
        case signInRoutine.REQUEST:
        case signOutRoutine.REQUEST:
            return { ...state, loading: true};
        case signUpRoutine.SUCCESS:
            return { ...state, isRegistered: true, profile: action.payload };
        case signUpRoutine.FAILURE:
            return { ...state, isRegistered: false };
        case confirmationRoutine.SUCCESS:
            return { ...state, isConfirmed: true };
        case confirmationRoutine.FAILURE:
            return { ...state, isConfirmed: false };
        case signInRoutine.SUCCESS:
            return { ...state, isLoggedIn: true, profile: action.payload };
        case signInRoutine.FAILURE:
            return { ...state, isLoggedIn: false };
        case signUpRoutine.FULFILL:
        case confirmationRoutine.FULFILL:
        case signInRoutine.FULFILL:
            return { ...state, loading: false };
        case signOutRoutine.FULFILL:
            return initialState;
        default:
            return state;
    }
};