import { signUpRoutine, confirmationRoutine } from "../actions";

const initialState = {
    loading: false,
    isRegistered: false,
    isConfirmed: false,
    email: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case signUpRoutine.REQUEST:
        case confirmationRoutine.REQUEST:
            return { ...state, loading: true};
        case signUpRoutine.SUCCESS:
            return { ...state, isRegistered: true };
        case signUpRoutine.FAILURE:
            return { ...state, isRegistered: false };
        case confirmationRoutine.SUCCESS:
            return { ...state, isConfirmed: true };
        case confirmationRoutine.FAILURE:
            return { ...state, isConfirmed: false };
        case signUpRoutine.FULFILL:
            return { ...state, loading: false, ...action.payload};
        case confirmationRoutine.FULFILL:
            return { ...state, loading: false};
        default:
            return state;
    }
};